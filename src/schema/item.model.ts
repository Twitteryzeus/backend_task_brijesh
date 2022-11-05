import mongoose from "./index";

const todoSchema = new mongoose.Schema({
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
