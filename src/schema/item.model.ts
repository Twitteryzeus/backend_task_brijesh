import { Schema } from 'mongoose';
import mongoose from "./index";

const todoSchema:Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: false
  }
},{
  timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
