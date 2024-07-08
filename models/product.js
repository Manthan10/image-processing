const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  serialNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inputImageUrls: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  outputImageUrls: {
    type: DataTypes.TEXT,
  },
  requestId: {
    type: DataTypes.UUID,
    references: {
      model: "ProcessingRequests",
      key: "requestId",
    },
  },
});

module.exports = Product;
