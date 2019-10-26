# Contributing

## Project Structure

Wilo was bootstrapped with Create-React-App.  
The directory structure looks like a monorepo one: in the `src` directory there are a few "modules/packages" that separates the app in different functional blocks.  
Every module is prefixed by `wiro-`.  
Every module can be imported directly using its absolute path.

```javascript
src
 ├── wilo-api // Jira APIs
 │
 ├── wilo-api // Entry-point to the app/extension
 │
 ├── wilo-auth // Onboarding and domain picker screen
 │
 ├── wilo-dashboard // Jira issues list
 │
 ├── wilo-design // Common styles, colors, etc...
 │
 └── wilo-utils // Utilities
```

## Developing Wilo

First of all, make sure to install the Wilo dependencies with `yarn install`.

Then:

- To develop the extension on Chrome, run `yarn watch`. You'll find the unpacked extension in `./build`.
- To develop the extension on the web, run `yarn start` (currently the Jira integration is not supported on the web).
- To build the Chrome extension, run `yarn build`. You'll find the unpacked extension in `./build`.
