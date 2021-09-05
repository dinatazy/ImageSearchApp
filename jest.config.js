module.exports = {
  preset: "react-native",
  transformIgnorePatterns: ['node_modules/(?!@foobar)/'],
  globals: {__DEV__: true}
}