const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Stores guest profile and contact information for the single hotel. Used for reservation records and hotel operations.
const Guest = sequelize.define(
  "guest",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    fullname: {
      // Full name of the guest.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    email: {
      // Guest's email address for contact or info purposes.
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      // Guest's phone number, used for record or contact as needed.
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      // Full postal address of the guest.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      // Internal staff comments for the guest record (not exposed to guests).
      type: DataTypes.TEXT,
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
    indexes: [],
  },
);

module.exports = Guest;
