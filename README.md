# Bookmark Labeller
**Bookmark Labeller** is a Firefox add-on which labels bookmarks with emojis. Choose from a set of 9 pre-defined emojis, or customise and choose your own favourite emojis.

## Development
Prerequisite: `web-ext`

Install dependencies
```sh
npm install
```

Using Parcel with HMR to start the development server
```sh
npm start
```

In another terminal, run
```sh
web-ext run
```

## Build
Builds the extension to the `dist` directory
```sh
npm run build
```

Packages the extension into a `.zip` file
```sh
web-ext build -s dist
```