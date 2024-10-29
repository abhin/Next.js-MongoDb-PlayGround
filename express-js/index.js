import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import Todos from "./modals/todo.js";

const server = express();

server.use(bodyParser.json());

server.get("/api/v1/healthcheck", (req, res) => {
  res.status(200).json({
    succes: true,
    msg: "Server is running...",
  });
  res.end();
});

server.post("/api/v1/todos/create", (req, res) => {
  const { title, description } = req.body;

  if (!title || title.length == 0 || !description || title.description == 0) {
    res.status(400).json({
      success: false,
      message: "Required fields are empty",
    });
  } else {
    Todos.findOne({ title })
      .then((data) => {
        if (data) {
          res.status(400).json({
            success: false,
            message: "Todo already Exists",
          });
        } else {
          Todos.create({ title, description }).then((data) => {
            res.status(200).json({
              success: true,
              message: `Todo '${data.title}' is created Id: ${data._id}`,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

server.get("/api/v1/todos/read", (req, res) => {
  Todos.find()
    .then((todos) => {
      return res.status(200).json({
        success: true,
        todos,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

server.put("/api/v1/todos/update", (req, res) => {
  const { id, title, description, completed } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Todo ID is required",
    });
  }

  Todos.findByIdAndUpdate(
    id,
    { title, description, completed },
    { new: true, upsert: true, runValidators: true }
  )
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: data, // Returning updated data
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err.message || "An error occurred while updating the Todo",
      });
    });
});

server.get("/api/v1/todos/delete/:id", (req, res) => {
  const { id } = req.params;

  Todos.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          success: true,
          message: "Todo deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Todo does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2"
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
