module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('favorite', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.user);
        Favorite.belongsTo(models.article);
      }
    }
  });
  return Favorite;
};