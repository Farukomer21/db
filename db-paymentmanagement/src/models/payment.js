const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a payment transaction record for a reservation. Tracks status, amount, method, and reconciliation information tied to the reservation. No embedded payment processing; only audit/logging for payment workflow.
const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation for which this payment was made.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    amount: {
      // Amount paid in this transaction (in hotel's default currency).
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    paymentStatus: {
      // Current status of the payment (pending, successful, failed, refunded).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    paymentMethod: {
      // How the payment was attempted: external gateway, cash, or card (staff-side record).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "external_gateway",
    },
    gatewayReference: {
      // External payment gateway reference, transaction ID, or offline payment identifier for auditing and reconciliation.
      type: DataTypes.STRING,
      allowNull: true,
    },
    processedAt: {
      // Date/time the payment was processed, confirmed, or failed.
      type: DataTypes.DATE,
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
    ],
  },
);

module.exports = Payment;
