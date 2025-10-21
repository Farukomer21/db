const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Hotel reservation record linking guest, room, payment, packages, special requests, and a secure reservationCode for guest access. Used for both staff and guest workflows.
const Reservation = sequelize.define(
  "reservation",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    guestId: {
      // Reference to guest who made this reservation.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    roomId: {
      // Reference to the hotel room for this reservation.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    checkInDate: {
      // Check-in date for the reservation.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    checkOutDate: {
      // Check-out date for the reservation.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    reservationCode: {
      // Unique, cryptographically secure reservation code for guest access. Null until payment is confirmed.
      type: DataTypes.STRING,
      allowNull: true,
    },
    packages: {
      // Array of package IDs associated to this reservation (maps to packageReservationMapping).
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    specialRequests: {
      // Array of specialRequest IDs associated with this reservation.
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
    paymentId: {
      // Reference to the payment record for this reservation.
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      // Reservation status: pending=not yet paid, confirmed=paid, canceled, completed=after stay.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    numGuests: {
      // Number of guests for this reservation.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalPrice: {
      // Total price for the reservation (rooms + packages).
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    notes: {
      // Internal notes, only for staff eyes (not sent to guests/public).
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
    indexes: [
      {
        unique: false,
        fields: ["guestId"],
      },
      {
        unique: false,
        fields: ["roomId"],
      },

      {
        unique: true,
        fields: ["reservationCode"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Reservation;
