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
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    seen: DataTypes.INTEGER,
    time: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    articleSourceId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        Article.belongsTo(models.category);
        Article.belongsTo(models.articleSource);
        Article.hasMany(models.favorite);
        Article.hasMany(models.subscription);

        Article.belongsToMany(models.user, {
          through: models.articleHistory
        });
      }
    }
  });
  return Article;
};