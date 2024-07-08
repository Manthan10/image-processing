const axios = require("axios");
const sharp = require("sharp");
const { Product, ProcessingRequest } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const processImages = async () => {
  const pendingRequests = await ProcessingRequest.findAll({
    where: { status: "pending" },
  });

  for (const request of pendingRequests) {
    const products = await Product.findAll({
      where: { requestId: request.requestId },
    });

    for (const product of products) {
      const inputUrls = product.inputImageUrls.split(",");
      const outputUrls = [];

      for (const url of inputUrls) {
        const response = await axios({ url, responseType: "arraybuffer" });
        const imagePath = path.join(
          __dirname,
          `../uploads/${path.basename(url)}`
        );
        await fs.promises.writeFile(imagePath, response.data);

        const outputPath = path.join(
          __dirname,
          `../uploads/output-${path.basename(url)}`
        );
        await sharp(imagePath).jpeg({ quality: 50 }).toFile(outputPath);

        outputUrls.push(outputPath);
      }

      product.outputImageUrls = outputUrls.join(",");
      await product.save();
    }

    request.status = "completed";
    await request.save();
  }
};

setInterval(processImages, 60000); // Run every 60 seconds
