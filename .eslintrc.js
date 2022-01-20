module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: ["rollup.config.js"],
      parserOptions: {
        sourceType: "module"
      }
    }
  ]
};
