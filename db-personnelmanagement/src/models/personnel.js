const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a staff/personnel record for the single hotel, used exclusively for operational tracking and management. Does not store sensitive HR data.
const Personnel = sequelize.define(
  "personnel",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      // Full name of the employee/staff member.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    jobTitle: {
      // Job title or operational role of this staff member (e.g., Housekeeper, Receptionist).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    department: {
      // Department within hotel operations (e.g., Housekeeping, Front Desk, Kitchen).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    startDate: {
      // Date staff member started employment or became active at the hotel.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    endDate: {
      // Date staff member left or ended employment (null if current).
      type: DataTypes.DATE,
      allowNull: true,
    },
    contactInfo: {
      // Contact information for operational use (email, phone, or other). Not sensitive HR data.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    notes: {
      // Internal operational notes about the staff member (free text, not sensitive HR data). Optional.
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
    indexes: [],
  },
);

module.exports = Personnel;
