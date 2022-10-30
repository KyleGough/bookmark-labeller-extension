# Bookmark Labeller
Label bookmarks with your favourite emojis

## Development
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

## Packaging Source Code
```sh
zip -r bookmark-labeller-extension-source.zip . -x "dist/*" "node_modules/*" ".git/*" ".parcel-cache/*"
```
