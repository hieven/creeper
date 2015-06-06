module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('article', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    source: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    seen: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.category);
      }
    }
  });
  return Article;
};