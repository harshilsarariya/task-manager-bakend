const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Task Manager backend listening at http://localhost:${port}`);
});
