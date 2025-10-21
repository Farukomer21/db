const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Records special guest requests for hotel reservations and their staff-handling lifecycle. Linkable both to reservation and guest, with status for workflow control.
const SpecialRequest = sequelize.define(
  "specialRequest",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation for this special request.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    guestId: {
      // ID of the guest who made this special request (redundant for tracing, resolved via reservation also).
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    requestText: {
      // Text description of the guest's special request.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    status: {
      // Current status of the special request ('pending','fulfilled','canceled').
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    response: {
      // Staff action or response to the special request (free text).
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
        fields: ["guestId"],
      },
      {
        unique: false,
        fields: ["status"],
      },
    ],
  },
);

module.exports = SpecialRequest;
