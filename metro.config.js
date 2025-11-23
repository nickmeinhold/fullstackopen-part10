const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver = defaultConfig.resolver || {};
defaultConfig.resolver.sourceExts = defaultConfig.resolver.sourceExts || [];
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
