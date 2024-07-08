const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const uuid = require("uuid");
const ProcessingRequest = require("../../models/processingRequest");
const Product = require("../../models/product");

const fileUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/input-csv/");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});

const upload = multer({ storage: fileUpload });

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
      const isValid = results.every((row) => {
        const trimmedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.trim(), value])
        );
        return (
          trimmedRow["Serial Number"] &&
          trimmedRow["Product Name"] &&
          trimmedRow["Input Image Urls"]
        );
      });
      if (!isValid) {
        return res.status(400).json({ error: "Invalid CSV format" });
      }

      const requestId = uuid.v4();
      await ProcessingRequest.create({ requestId, status: "pending" });

      for (const row of results) {
        const trimmedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.trim(), value])
        );
        await Product.create({
          serialNumber: trimmedRow["Serial Number"],
          productName: trimmedRow["Product Name"],
          inputImageUrls: trimmedRow["Input Image Urls"],
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
