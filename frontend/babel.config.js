// preset-env & preset-react this is only for JSX in Jest
//   cp https://jestjs.io/docs/tutorial-react
module.exports = {
  presets: [
    ['@babel/preset-env', {
      // Setup is so straightforward. Sheesh.
      //   https://stackoverflow.com/a/59823659/1552906
      "targets": {"node": "current"}
    }],
    '@babel/preset-react',
  ],
}
