const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a pricing record for a hotel room, including effective date range, price value, price type (standard, promotional, seasonal), and staff notes. Enables both historical pricing and forward-looking rates.
const RoomPrice = sequelize.define(
  "roomPrice",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    roomId: {
      // Reference to the room for which this price is applicable.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    startDate: {
      // Start date from which this price is effective (inclusive).
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    endDate: {
      // Optional end date (exclusive) for which this price is valid. Leave null for open-ended rates.
      type: DataTypes.DATE,
      allowNull: true,
    },
    price: {
      // Price value for this room and date range, in hotel currency.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    priceType: {
      // Price type: standard, promotional, or seasonal.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "standard",
    },
    description: {
      // Staff-facing description or note for this price entry.
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["roomId"],
      },
      {
        unique: false,
        fields: ["startDate"],
      },
      {
        unique: false,
        fields: ["priceType"],
      },
    ],
  },
);

module.exports = RoomPrice;
