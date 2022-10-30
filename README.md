# Bookmark Labeller
Label bookmarks with your favourite emojis. The add-on comes with 9 default emojis which can be customised. Use the add-on action button to select emojis or right-click bookmarks to add emojis with the context menu.

<div align="center">
  <img src="https://user-images.githubusercontent.com/24881448/198887652-6c0f0db6-e5d9-47b3-852b-549f18606e50.png" alt="Popup" />
  <img src="https://user-images.githubusercontent.com/24881448/198887101-0bbafa1d-650a-4fd8-b242-1cd8335bedc6.png" alt="Labelled bookmark folder" />
</div>

## Table of Contents
- [Development](#development)
- [Build](#build)
- [Screenshots](#screenshots)


## Development
Install dependencies and run the development server with Parcel
```sh
npm install
npm start # --> parcel watch manifest.json --host localhost --config @parcel/config-webextension
```

In another terminal, run
```sh
web-ext run
```

## Build
Builds the extension to the `dist` directory, then packages into a `.zip` file
```sh
npm run build # --> parcel build manifest.json --config @parcel/config-webextension
web-ext build -s dist
```

## Screenshots

![popup-custom](https://user-images.githubusercontent.com/24881448/198887894-02b00015-c09b-447f-b13a-0f26873101e4.png)
![popup-default](https://user-images.githubusercontent.com/24881448/198887895-47654d9a-1995-4c7a-9374-8ebe84715de0.png)
![popup-selected](https://user-images.githubusercontent.com/24881448/198887897-e4226be8-38f1-46dd-98d5-de232d9d5bcb.png)
![bookmark-folder](https://user-images.githubusercontent.com/24881448/198887101-0bbafa1d-650a-4fd8-b242-1cd8335bedc6.png)
![context-menu](https://user-images.githubusercontent.com/24881448/198887271-7e03ec9d-2373-409a-8439-a5c179a109e3.png)
