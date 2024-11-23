# Blinder Widget Quickstart


Quickstart for using Blinder's Copyright Widget

- [Web Payments SDK Overview]().
- [API Documentation]().

## Getting Started

Install [Node.js](https://nodejs.org/en/about/releases/) which will include `npm`. This repository contains an `.nvmrc` file if you use [`nvm`](https://github.com/nvm-sh/nvm) to manage your node versions.

Then, to install dependencies run:

```sh
npm install
```

Run the development server.

```sh
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000).

- Frontend side

In the html we sould create a div element
```
<div id="blinderFrame"></div>
```
And initialize the Blinder form widget like this.
```
const blinderHandler = new BlinderWidget.Handler('blinderFrame', 1);
blinderHandler.setClientID('pub_98d1aXXX...');
```

- Backend side

You need to create Blinder object.
```
const blinderClient = Blinder.Blinder([PRIVATE_KEY]);
```

Ex:
```
const blinderClient = Blinder.Blinder('pk_08e6b9c2fXXX...');
```

-- API endpoints
--- createUser
```
const createUserRes = await blinderClient.createUser({
  firstName: payload.firstName,
  lastName: payload.lastName,
  email: payload.email,
});
```

- DB
The API tokens are stored at "agent_tokens" table of copyrightdb.