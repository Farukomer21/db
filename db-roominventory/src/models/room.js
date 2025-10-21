const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a room in the hotel. Includes identifiers, type, status, amenities, and details needed for room search and assignment.
const Room = sequelize.define(
  "room",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    roomNumber: {
      // Unique number or code for the room (e.g., 101, B12).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    floor: {
      // Floor number where room is located.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      // Room type (e.g., single, double, suite).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "single",
    },
    capacity: {
      // Maximum number of guests room can accommodate.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bedType: {
      // Type of beds (e.g., queen, twin, king).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    amenities: {
      // Array of amenity descriptions (e.g., Wi-Fi, TV, minibar).
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    status: {
      // Room status (available, occupied, under maintenance).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
    },
    description: {
      // Detailed textual description of the room.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    images: {
      // Image URLs for the room.
      type: DataTypes.ARRAY(DataTypes.STRING),
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
        fields: ["status"],
      },

      {
        unique: true,
        fields: ["roomNumber"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Room;
