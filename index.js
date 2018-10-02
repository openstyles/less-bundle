const Less = require("less/lib/less");
const defaultOptions = require("less/lib/less/default-options");
const less = new Less;
less.PluginLoader = function(){};
less.options = defaultOptions();
module.exports = less;
