# Contributing

Jira Express was bootstrapped with Create-React-App and uses TypeScript and Styled-Components.  
To make Create-React-App output correctly the extension assets, a few customizations have been applied to the `start` and `build` scripts.

## Project Structure

The directory structure looks somewhat similar to monorepo: in `src` you can find modules/packages that separates the app in different functional blocks.  
Each module is prefixed by `jexp-` and is set as an alias, so you can import by specifying its absolute path.

```javascript
chrome // Chrome-specific static asset
 |
firefox // Firefox-specific static assets
 |
public // Common static assets
 |
scripts // Custom scripts
 |
src
 ├── jexp-api // Jira APIs
 │
 ├── jexp-app // Entry-point to the app/extension
 │
 ├── jexp-assets // Mostly images
 │
 ├── jexp-auth // Account picker screen
 │
 ├── jexp-common // Common components
 │
 ├── jexp-dashboard // Recent issues screen
 │
 ├── jexp-design // Common styles, colors, etc...
 │
 ├── jexp-search // Search screen
 │
 ├── jexp-settings // Settings screen
 │
 └── jexp-utils // Utilities
```

## Developing Jira Express

- Install the Jira Express dependencies with `npm install`.
- To develop Jira Express, run `npm run start:chrome` or `npm run start:firefox`, depending on which browser you want to use. Live reloading works out of the box.
- To build Jira Express for production, run `npm run build:chrome` or `npm run build:firefox`, depending on which browser you want to use.
- You'll find the unpacked extension in `./build-chrome` or `./build-firefox`.
