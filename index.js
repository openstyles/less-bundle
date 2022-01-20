const Less = require("./test/less/packages/less/src/less");
const defaultOptions = require("./test/less/packages/less/src/less/default-options");
const less = new Less;
less.PluginLoader = function(){};
less.options = defaultOptions();
module.exports = less;
