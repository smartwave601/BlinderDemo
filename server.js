// micro provides http helpers
const { createError, json, send } = require('micro');
// microrouter provides http server routing
const { router, get, post } = require('microrouter');
const cors = require('micro-cors')()
// serve-handler serves static assets
const staticHandler = require('serve-handler');

// logger gives us insight into what's happening
const logger = require('./server/logger');

const axios = require('axios');

const Blinder = require('./blinder');

const blinderClient = Blinder.Blinder('pk_08e6b9c2f96d1daf23bcf633336f43ef05c63a1a12d5d01016b0e92ad25557a8');

async function createPayment(req, res) {
  const payload = await json(req);
  logger.debug(JSON.stringify(payload));
  // We validate the payload for specific fields. You may disable this feature
  // if you would prefer to handle payload validation on your own.
  if (!validatePaymentPayload(payload)) {
    throw createError(400, 'Bad Request');
  }
  send(res, statusCode, {
    success: true,
    payment: {
      id: result.payment.id,
      status: result.payment.status,
      receiptUrl: result.payment.receiptUrl,
      orderId: result.payment.orderId,
    },
  });
}

async function createUser(req, res) {
  const payload = await json(req);

  const createUserRes = await blinderClient.createUser({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
  });
  send(res, 200, createUserRes);
}

async function createIntent(req, res) {
  const payload = await json(req);

  const createUserRes = await blinderClient.createIntent({
    userID: payload.userID,
  });
  send(res, 200, createUserRes);
}

// serve static files like index.html and favicon.ico from public/ directory
async function serveStatic(req, res) {
  await staticHandler(req, res, {
    public: 'public',
  });
}

// export routes to be served by micro
module.exports = cors(router(
  post('/create-intent', createIntent),
  post('/create-user', createUser),
  get('/*', serveStatic),
));
