const express = require("express");
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port = 5000;

// add middleware for sending json
app.use(express.json());

//Available routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Task Manager backend listening at http://localhost:${port}`);
});
