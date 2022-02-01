# Looker Public Embed App Template

A simple template built using Nodejs and Express to public embed Looker dashboards. **NOTE THIS WILL MAKE DASHBOARDS ON YOUR INSTANCE PUBLIC**

## Installation and setup

Use npm to install the app

```javascript
npm i
```

Setup:
1) Update entries in `.env.example` and rename to `.env`
2) In your Looker instance, ensure embedding is enabled (in the Admin > Embed menu), and that the application's URL (typically `http://localhost:3000` if you're running it locally) is whitelisted
3) Replace `public/images/logo.png` and `public/favicon.png`
4) Replace the default dashboard ID, look ID, explore, theme, and users in `/config/default.json`
5) Run with `npm run devstart`

## Usage

```javascript
npm run devstart
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
