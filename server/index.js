
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
const app = express();

const port = 5001;

// middleware
app.use(express.json());
app.use(cors());
app.use("/", router);

// database connection
mongoose
  .connect(
    "mongodb+srv://sanketmn26:UVjuxhmSssHUrh3x@cluster0.ijsv5zl.mongodb.net/class_timeslots?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("Connected to database");
  })

  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at : ${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
