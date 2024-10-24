## Getting Started

## installation

npm

`npm install @d3-inc/marketplace-widget`

yarn

`yarn add @d3-inc/marketplace-widget`

## Documentation

You can find complete details about usage and UX flow of the marketplace-widget at [D3 Docs](https://docs.d3.app/channel-partner-integrations/d3-embed)

### Local setup

- `yarn` - installs all npm dependencies
- `yarn build:widget` - produces a ready to deploy widget
- `yarn dev` - to run the consumer app using the widget
- `yarn watch:widget` - to run the widget in watch mode. This will show the real time changes in the test app

If you want to test the widget locally, you can do so by cloning this repo and running the test app, which is using latest version of the widget

- create a .env file in the `packages/widget-test-app`
- copy the env variables from `.env.example` file to `packages/widget-test-app/.env`
- Add a valid api dev key to the `VITE_D3_API_KEY` variable in the `.env` file

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
