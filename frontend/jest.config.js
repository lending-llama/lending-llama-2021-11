module.exports = {
  // Without {watchman: false} jest would hang indefinitely with
  //   jest@27.3.1, node@14.18.1, watchman@2021.10.18.00 & macOS@11.5.2.
  // This seems like a long-known issue
  //   https://stackoverflow.com/questions/48846142
  //   https://github.com/facebook/jest/issues/4529
  // It’s even in the docs: https://jestjs.io/docs/troubleshooting#watchman-issues
  // Yeah, why fix it.
  watchman: false,

  testEnvironment: "jsdom"
};
