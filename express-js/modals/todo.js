import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  }
});

const Todos = mongoose.model('Todos', todoSchema);

export default Todos;