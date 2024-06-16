import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routes/todo.route.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3000, () => {
  console.log("App is listening on the port 3000");
});

mongoose
  .connect("mongodb+srv://todo:123@todo.omgb5qu.mongodb.net/todos")
  .then(() => {
    console.log("Connection successfully");
  })
  .catch((error) => {
    console.log("Error", error.message);
  });

app.use("/", todoRouter);
