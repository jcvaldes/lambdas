"use strict";
const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", (req, res) => {
  const { userId, name } = req.body;
  res.json({ userId, name });
});

module.exports.generic = serverless(app);
