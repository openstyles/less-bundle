/* eslint-env mocha */
/* global less */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

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

const NO_OPTIONS_DIRS = new Set([
  ".", "no-strict-math", "3rd-party", "legacy", "namespacing"
]);

describe("less test", () => {
  const root = path.resolve(`${require.resolve("less/test")}/../css`);
  for (const file of fs.readdirSync(root, {withFileTypes: true})) {
    if (file.isDirectory()) {
      const subdir = `${root}/${file.name}`;
      for (const file of fs.readdirSync(subdir, {withFileTypes: true})) {
        if (file.isFile()) {
          test(subdir, file.name);
        }
      }
    } else {
      test(root, file.name);
    }
  }
  function test(dir, name) {
    const fullPath = `${dir}/${name}`;
    const relativePath = path.relative(root, fullPath);
    it(relativePath, function () {
      const dir = path.dirname(relativePath);
      if (!NO_OPTIONS_DIRS.has(dir) || name.startsWith("javascript")) {
        // has options
        this.skip();
      }
      const sourcePath = fullPath.replace(/([\\/])css[\\/]/, "$1less$1").replace(/\.css$/, ".less");
      const expect = fs.readFileSync(fullPath, "utf8");
      const source = fs.readFileSync(sourcePath, "utf8");
      if (/@(import|plugin)/.test(source)) {
        // file related
        this.skip();
      }      
      return less.render(source)
        .then(result => {
          assert.equal(result.css, expect);
        });
    });
  }
});
