const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Defines a package or extra service (e.g., breakfast, spa access) that can be offered to guests and linked to reservations. Managed by staff.
const Package_ = sequelize.define(
  "package_",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      // Name of the package or extra service.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    description: {
      // Detailed description of the package/extra service.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    price: {
      // Price for the package/extra, in hotel currency.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    duration: {
      // (Optional) How long the package/extra is valid (e.g., per day, per stay, etc.).
      type: DataTypes.STRING,
      allowNull: true,
    },
    conditions: {
      // (Optional) Any conditions or rules attached to the package (e.g., must book 2 nights).
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

module.exports = Package_;
