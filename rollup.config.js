import cjs from "rollup-plugin-cjs-es";
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
