const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProcessingRequest = sequelize.define("ProcessingRequest", {
  requestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProcessingRequest;
