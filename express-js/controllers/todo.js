import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { create, update, read, deleteOne } from "../modals/todo.js";

dotenv.config();

const server = express();

server.use(bodyParser.json());

server.get("/api/v1/healthcheck", (req, res) => {
  res.status(200).json({
    succes: true,
    msg: "Server is running...",
  });
  res.end();
});

server.post("/api/v1/todos/create", create);

server.get("/api/v1/todos/read", read);

server.put("/api/v1/todos/update", update);

server.get("/api/v1/todos/delete/:id", deleteOne);

mongoose
  .connect(
    process.env.DB_URL
  )
  .then((data) => {
    console.log("MongoDb Connected Successfully");
    server.listen(8001, () => {
      console.log("Server started Port:8001");
    });
  })
  .catch((err) => {
    console.log("MongoDb Connection Error!", err);
  });
