const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Mapping between a reservation and a selected package (extra service). Represents a many-to-many association. Includes price at booking and staff notes.
const PackageReservation = sequelize.define(
  "packageReservation",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation that this package is linked to.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    packageId: {
      // Reference to the package/extra selected for the reservation.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    priceAtBooking: {
      // Unit price of the package at the time of booking. Used for historical pricing and audit.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    notes: {
      // Optional staff note about the package-reservation mapping.
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
        fields: ["reservationId"],
      },
      {
        unique: false,
        fields: ["packageId"],
      },

      {
        unique: true,
        fields: ["reservationId", "packageId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = PackageReservation;
