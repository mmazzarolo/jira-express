#!/usr/bin/env node

// Force a "production" environment in watch mode
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const fs = require("fs-extra");
const path = require("path");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const configFactory = require("react-scripts/config/webpack.config");
const colors = require("colors/safe");
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

// Create the Webpack config usings the same settings used by the "start" script
// of create-react-app.
const config = configFactory("production");

// Edit the Webpack config by setting the output directory to our custom build
// directory.
config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + "/";

// Copy browser-specific files into the output directory.
config.plugins.push(
  new CopyWebpackPlugin({
    patterns: [{ from: `./${process.env.TARGET_BROWSER}` }],
  })
);

// Start Webpack.
const compiler = webpack(config);
console.info("Creating an optimized production build...");
compiler.run(function (err) {
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
  }
});
