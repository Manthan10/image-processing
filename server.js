const express = require("express");
const sequelize = require("./config/database");
const uploadRoute = require("./api/routes/uploadRoute");
const statusRoute = require("./api/routes/statusRoute");

const app = express();

app.use(express.json());
app.use("/api", uploadRoute);
app.use("/api", statusRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
