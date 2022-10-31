# Bookmark Labeller
<a href="https://addons.mozilla.org/en-US/firefox/addon/bookmark-labeller/">
  <img src="https://img.shields.io/badge/-Install%20Add--On-blue?style=for-the-badge&logo=firefox" alt="Install Badge" />
</a>
<img src="https://img.shields.io/amo/v/%7B1cbc84ca-1f1b-46b2-bbe2-0bad029eb636%7D?style=flat-square" />

Bookmark Labeller is a lightweight and minimalistic Firefox browser extension that allows you to label bookmarks with your favourite emojis. The extension comes with default emojis which can be customised and interchanged. Use the action button to select emojis or right-click bookmarks to add emojis with the context menu.

## Table of Contents
- [Install](#install)
- [Development](#development)
- [Build](#build)
- [Screenshots](#screenshots)

![Extension Popup](https://user-images.githubusercontent.com/24881448/198891524-3ccf0aef-33a3-4dc8-b3f1-a8a73562a5d1.jpg)

## Install
<a href="https://addons.mozilla.org/en-US/firefox/addon/bookmark-labeller/">
  <img src="https://img.shields.io/badge/-Install%20Add--On-blue?style=for-the-badge&logo=firefox" alt="Install Badge" />
</a>

## Development
Clone the repository, install all the dev dependencies and then use the `start` command to prompt [Parcel](https://parceljs.org/) to start the development server. The development server watches for file changes and updates the `dist` directory.
```sh
npm install
npm start
# start --> parcel watch manifest.json --host localhost --config @parcel/config-webextension
```

In another terminal use [web-ext](https://github.com/mozilla/web-ext) to load the extension temporarily in the browser. Any file changes will be picked up and will reload the extension automatically.
```sh
web-ext run
```

## Build
To build the project and make it ready for production, we use [Parcel](https://parceljs.org/), a build tool requiring minimal configuration. First run the `build` command to output the bundled and minified code, and then use the [web-ext](https://github.com/mozilla/web-ext) tool to build and package the `dist` directory into a distributable `.zip` file.
```sh
npm run build
# build --> parcel build manifest.json --config @parcel/config-webextension
web-ext build -s dist
```

## Screenshots

![popup-custom](https://user-images.githubusercontent.com/24881448/198887894-02b00015-c09b-447f-b13a-0f26873101e4.png)
![popup-selected](https://user-images.githubusercontent.com/24881448/198887897-e4226be8-38f1-46dd-98d5-de232d9d5bcb.png)
![bookmark-folder](https://user-images.githubusercontent.com/24881448/198887101-0bbafa1d-650a-4fd8-b242-1cd8335bedc6.png)
![context-menu](https://user-images.githubusercontent.com/24881448/198887271-7e03ec9d-2373-409a-8439-a5c179a109e3.png)
