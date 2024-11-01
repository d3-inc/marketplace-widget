# Project

A customizable widget that can be embedded directly into your platform with minimal code, D3 Marketplace Widget will make it easier than ever to integrate Name Token sales into your platform. D3 Embed is a simple yet powerful tool designed to seamlessly fit into your website or application, allowing your users to interact with D3 services directly from your site.

Visit our [demo](https://d3-inc.github.io/marketplace-widget/) page to see the live version of the widget

![D3 widget light theme](https://cdn.d3.app/assets/widgets/widget-light.png)
![D3 widget dark theme](https://cdn.d3.app/assets/widgets/widget-dark.png)

## Getting Started

## installation

npm

`npm install @d3-inc/marketplace-widget`

yarn

`yarn add @d3-inc/marketplace-widget`

## Documentation

You can find complete details about widget API and UX flow of the marketplace-widget at [D3 Docs](https://docs.d3.app/channel-partner-integrations/d3-embed)

### Local setup

- `yarn` - installs all npm dependencies
- `yarn build:widget` - produces a ready to deploy widget
- `yarn dev` - to run the consumer app using the widget
- `yarn watch:widget` - to run the widget in watch mode. This will show the real time changes in the test app

To test the widget locally, you can do so by cloning this repo and running the test app, which is using latest version of the widget.

- create a .env file in the `packages/widget-test-app`
- copy the env variables from `.env.example` file to `packages/widget-test-app/.env`
- Add a valid api dev key to the `VITE_D3_API_KEY` variable in the `.env` file

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
