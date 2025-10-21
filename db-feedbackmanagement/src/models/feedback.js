const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Records guest feedback after hotel stay, linked to reservation. Used for quality improvement and guest satisfaction tracking.
const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    reservationId: {
      // Reference to the reservation for which feedback is submitted. Used for traceability and eligibility check.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    guestName: {
      // Name of the guest submitting feedback (free text).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    rating: {
      // Rating from 1 to 5 reflecting guest's satisfaction.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      // Free-text feedback, comment on guest's experience.
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "text",
    },
    submittedAt: {
      // Timestamp of when feedback was submitted. Automatically set on create.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
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

module.exports = Feedback;
