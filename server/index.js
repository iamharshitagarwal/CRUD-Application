const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/harshitdb");
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./routes/route");
app.use("/api", routes);

app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});

