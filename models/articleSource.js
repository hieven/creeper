module.exports = function(sequelize, DataTypes) {
  var ArticleSource = sequelize.define('articleSource', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    
  }, {
    classMethods: {
      associate: function(models) {
        ArticleSource.hasMany(models.article);
      }
    }
  });
  return ArticleSource;
};