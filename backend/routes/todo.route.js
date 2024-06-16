import express from "express";
import { Todo } from "../model/todo.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ error: "Please fill out all the required fields" });
    }

    const todo = new Todo({
      title,
      description,
      status,
    });

    const isTodo = await Todo.findOne({ title: title });

    if (isTodo) {
      return res
        .status(400)
        .json({ error: "Todo with this title already exists" });
    }

    const savedTodo = await todo.save();

    return res.status(201).json({ success: true, savedTodo });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    if (todos) {
      return res.status(200).json(todos);
    }

    return res.status(404).json({ error: "todos not found" });
  } catch (error) {
    console.log("Error :", error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json({ success: true, todo });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const { id } = req.params;

    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ error: "Please fill out all the required fields" });
    }

    const todo = {
      title,
      description,
      status,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });

    return res.status(200).json({ success: true, updatedTodo });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    return res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
