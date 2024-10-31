import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Todos = mongoose.model("Todos", todoSchema);

const create = (req, res) => {
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
};

const read = (req, res) => {
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
};

const update = (req, res) => {
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
};

const deleteOne = (req, res) => {
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
};

export { create, read, update, deleteOne };

export default Todos;
