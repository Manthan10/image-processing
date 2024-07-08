const sharp = require("sharp");
const ProcessingRequest = require("../models/processingRequest");
const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

const processImages = async () => {
  try {
    const pendingRequests = await ProcessingRequest.findAll({
      where: { status: "pending" },
    });

    if (pendingRequests.length === 0) {
      return;
    }

    for (const request of pendingRequests) {
      const products = await Product.findAll({
        where: { requestId: request.requestId },
      });

      for (const product of products) {
        const inputUrls = product.inputImageUrls?.split(",");

        const outputUrls = [];

        for (const url of inputUrls) {
          const outputPath = path.join(
            __dirname,
            `../uploads/images/output-${Date.now()}-${path.basename(url)}`
          );

          console.log(outputPath);

          await sharp(url).jpeg({ quality: 50 }).toFile(outputPath);

          outputUrls.push(outputPath);
        }

        product.outputImageUrls = outputUrls.join(",");
        await product.save();
      }

      const csvRows = [];
      const csvHeader =
        "Serial Number,Product Name,Input Image Urls,Output Image Urls";
      csvRows.push(csvHeader);

      for (const product of products) {
        const row = [
          product?.id,
          product?.productName,
          product?.inputImageUrls,
          product?.outputImageUrls,
        ].join(",");

        csvRows.push(row);
      }

      const csvContent = csvRows.join("\n");
      const csvPath = path.join(
        __dirname,
        `../uploads/output-csv/output-${Date.now()}.csv`
      );
      fs.writeFileSync(csvPath, csvContent);

      request.status = "completed";
      await request.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = processImages;
