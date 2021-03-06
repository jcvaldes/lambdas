"use strict";
const serverless = require("serverless-http");
const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const USERS_TABLE = process.env.USERS_TABLE;
// detecta si estoy en offline
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDB;

if (IS_OFFLINE === "true") {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}
console.log("info", USERS_TABLE);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// SAVE USER
app.post("/users", (req, res) => {
  const { userId, name } = req.body;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name,
    },
  };

  dynamoDB.put(params, (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "No se ha podido crear el usuario" });
    } else {
      res.json({
        userId,
        name,
      });
    }
  });
});
// GET ALL USERS
app.get("/users", (req, res) => {
  const params = {
    TableName: USERS_TABLE,
  };
  dynamoDB.scan(params, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "No se pudieron recuperar usuarios" });
    } else {
      const { Items } = result;

      res.json({
        success: true,
        message: "Usuarios cargados correctamente",
        users: Items,
      });
    }
  });
});
// GET USER BY ID
app.get("/users/:userId", (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  dynamoDB.get(params, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "No se ha podido acceder al usuario",
      });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      return res.json({ userId, name });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  });
});
module.exports.generic = serverless(app);
