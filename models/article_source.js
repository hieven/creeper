module.exports = function(sequelize, DataTypes) {
  var Article_source = sequelize.define('article_source', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    
  }, {
    classMethods: {
      associate: function(models) {
        Article_source.hasMany(models.article);
      }
    }
  });
  return Article_source;
};