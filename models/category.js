module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.article);
      }
    }
  });
  return Category;
};