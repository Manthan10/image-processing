const express = require("express");
const sequelize = require("./config/database");
const uploadRoute = require("./api/routes/uploadRoute");
const statusRoute = require("./api/routes/statusRoute");
const webhookRoute = require("./api/routes/webhookRoute");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// setInterval(processImages, 6000);

app.use("/api", uploadRoute);
app.use("/api", statusRoute);
app.use("/api", webhookRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
