const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const uuid = require("uuid");
const ProcessingRequest = require("../models/processingRequest");
const Product = require("../models/product");
const upload = multer({ dest: "uploads/" });

const uploadCSV = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const isValid = results.every(
        (row) =>
          row["Serial Number"] && row["Product Name"] && row["Input Image Urls"]
      );
      if (!isValid) {
        return res.status(400).json({ error: "Invalid CSV format" });
      }

      const requestId = uuid.v4();
      await ProcessingRequest.create({ requestId, status: "pending" });

      for (const row of results) {
        await Product.create({
          serialNumber: row["Serial Number"],
          productName: row["Product Name"],
          inputImageUrls: row["Input Image Urls"],
          requestId,
        });
      }

      res.status(200).json({ requestId });
    });
};

module.exports = {
  uploadCSV,
  upload,
};
