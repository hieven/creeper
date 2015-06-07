module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('article', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    caption: DataTypes.TEXT,
    content: DataTypes.TEXT,
    source: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    wordCount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    seen: DataTypes.INTEGER,
    time: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.category);
        Article.belongsTo(models.articleSource);
        Article.hasMany(models.favorite);
        Article.hasMany(models.subscription);
        Article.hasMany(models.articleHistory);
      }
    }
  });
  return Article;
};