module.exports = function(sequelize, DataTypes) {
  var ArticleHistory = sequelize.define('articleHistory', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        ArticleHistory.belongsTo(models.user);
        ArticleHistory.belongsTo(models.article);
      }
    }
  });
  return ArticleHistory;
};