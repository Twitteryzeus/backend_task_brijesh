import mongoose from "./index";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
},
  { timestamps: true }
);

// Student model
const Todo = mongoose.model("Todo", todoSchema);