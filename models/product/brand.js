"use strict";
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      brandStatus: { type: DataTypes.ENUM, values: ["active", "inactive"] },
      isDeleted: DataTypes.BOOLEAN,
    },
    {}
  );
  Brand.associate = function(models) {
    // associations can be defined here
    Brand.belongsToMany(models.Product, {
      through: models.ProductBrand,
      // foreignKey: {
      //   allowNull: false,
      // },
    });
  };
  return Brand;
};
