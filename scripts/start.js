#!/usr/bin/env node

// Force a "development" environment in watch mode
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const fs = require("fs-extra");
const path = require("path");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const configFactory = require("react-scripts/config/webpack.config");
const colors = require("colors/safe");
const ExtensionReloader = require("webpack-extension-reloader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Force a TARGET_BROWSER env var to be specified
if (!["chrome", "firefox"].includes(process.env.TARGET_BROWSER)) {
  throw new Error(
    `Invalid "TARGET_BROWSER" env var: ${process.env.TARGET_BROWSER}`
  );
}

// Use a different build directory based on the supported browser.
paths.appBuild = path.resolve(
  __dirname,
  `../build-${process.env.TARGET_BROWSER}`
);

// Clean the build directory before running.
fs.rmdirSync(paths.appBuild, { recursive: true });

// Create the Webpack config usings the same settings used by the "build" script
// of create-react-app.
const config = configFactory("development");

// Edit the Webpack config by setting the output directory to "./build".
config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + "/";

// Add the webpack-extension-reloader plugin to the Webpack config.
// It notifies and reloads the extension on code changes.
config.plugins.push(new ExtensionReloader());

// Copy browser-specific files into the output directory.
config.plugins.push(
  new CopyWebpackPlugin({
    patterns: [{ from: `./${process.env.TARGET_BROWSER}` }],
  })
);

// Start Webpack in watch mode.
const compiler = webpack(config);
compiler.watch({}, function (err) {
  if (err) {
    console.error(err);
  } else {
    // Every time Webpack finishes recompiling copy all the assets of the
    // "public" dir in the "build" dir (except for the index.html)
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: (file) => file !== paths.appHtml,
    });
    // Report on console the succesfull build
    console.clear();
    console.info(colors.green("Compiled successfully!"));
    console.info("Built at", new Date().toLocaleTimeString());
    console.info();
    console.info("Note that the development build is not optimized.");
    console.info("To create a production build, use yarn build.");
  }
});
