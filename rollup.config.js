import cjs from "rollup-plugin-cjs-es";
import re from "rollup-plugin-re";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import globals from "rollup-plugin-external-globals";

export default {
  input: "index.js",
  output: {
    file: "dist/less.min.js",
    format: "iife",
    name: "less"
  },
  plugins: [
    resolve(),
    re({
      patterns: [
        // https://github.com/less/less.js/issues/3313
        {
          match: /list\.js$/,
          test: "iterator.forEach(function(item)",
          replace: "iterator.forEach(item =>"
        }
      ]
    }),
    cjs({
      nested: true,
      exportType: {
        "node_modules/less/lib/less/data/unit-conversions.js": "default",
        "node_modules/less/lib/less/logger.js": "default"
      }
    }),
    globals({
      promise: "null"
    }),
    terser({
      compress: {
        passes: 3
      }
    })
  ]
};
