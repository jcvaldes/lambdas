"use strict";
const qs = require("querystring");
module.exports.hello = async (event, context, cb) => {
  console.log("eventoooo", event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `hola, ${event.pathParameters.name}`,
        input: event.name,
      },
      null,
      2
    ),
  };
};
module.exports.createUser = async (event, context, cb) => {
  const body = qs.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Peticion POST`,
        // input: event["body"],
        input: `hola, ${body.firstname} ${body.lastname}`,
      },
      null,
      2
    ),
  };
};
