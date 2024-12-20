const { sequelize } = require("../server");
const { DataTypes } = require("sequelize");

const produs = sequelize.define("produs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wishlist: {
    type: DataTypes.BOOLEAN,  
    defaultValue: false

  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  
});

module.exports = produs;
