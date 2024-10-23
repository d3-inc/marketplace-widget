# Project

## Getting Started

## scripts

We use [Yarn](https://yarnpkg.com/) as our main package manager. You should have basic knowledge of the yarn to manage this project. Please always use yarn to add, update and remove any npm dependencies instead of making direct changes in **package.json** or **yarn.lock** file. You can learn more about the yarn at the official docs [here](https://yarnpkg.com/getting-started).

- `yarn` - installs all npm dependencies
- `yarn build:widget` - produces a ready to deploy widget
- `yarn dev` - to run the consumer app using the widget
- `yarn watch:widget` - to run the widget in watch mode. This will show the real time changes in the test app

### Local setup

If you want to test the widget locally, you can do so by cloning this repo and running the test app, which is using latest version of the widget

- create a .env file in the `packages/widget-test-app`
- copy the env variables from `.env.example` file to `packages/widget-test-app/.env`
- Add a valid api dev key to the `VITE_D3_API_KEY` variable in the `.env` file

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Documentation

You can find complete details about usage and UX flow of the marketplace-widget at [D3 Docs](https://docs.d3.app/channel-partner-integrations/d3-embed)
