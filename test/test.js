/* eslint-env mocha */
/* global less */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const {walkSync} = require("@nodelib/fs.walk");

eval(fs.readFileSync(`${__dirname}/../dist/less.min.js`, "utf8"));

less.functions.functionRegistry.addMultiple({
  add: function (a, b) {
    return new(less.tree.Dimension)(a.value + b.value);
  },
  increment: function (a) {
    return new(less.tree.Dimension)(a.value + 1);
  },
  _color: function (str) {
    if (str.value === 'evil red') { return new(less.tree.Color)('600'); }
  }
});

describe("less test", () => {
  const root = `${__dirname}/less/packages/test-data/css`;
  for (const file of walkSync(root)) {
    if (file.dirent.isDirectory()) {
      continue;
    }
    const name = path.relative(root, file.path);
    test(file.path, name);
  }
  function test(fullPath, name) {
    it(name, function () {
      if ([
        /javascript\.css/,
        /^compression/,
        /^debug/,
        /^globalVars/,
        /^modifyVars/,
        /Plugin/
      ].some(rx => rx.test(name))) {
        this.skip();
        return;
      }
      const sourcePath = fullPath.replace(/([\\/])css[\\/]/, "$1less$1").replace(/\.css$/, ".less");
      const expect = fs.readFileSync(fullPath, "utf8");
      const source = fs.readFileSync(sourcePath, "utf8");
      if (/@(import|plugin)|data-uri\(/.test(source)) {
        // file related
        this.skip();
        return;
      }
      
      const strictUnits =
        name.match(/^units[\\/]no-strict/) ? false :
        name.match(/^units[\\/]strict/) ? true :
        undefined;
      
      const options = {
        math: strictUnits !== undefined ? 0 :
          name.match(/^math[\\/]([\w-]+)/)?.[1] || undefined,
        strictUnits
      };
      
      return less.render(source, options)
        .then(result => {
          assert.equal(result.css, expect);
        });
    });
  }
});
