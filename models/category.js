module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('category', {
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.article, {
          foreignKey: 'categoryId'
        });
      }
    }
  });
  return Category;
};