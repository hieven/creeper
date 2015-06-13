module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('article', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    caption: DataTypes.TEXT,
    content: DataTypes.TEXT,
    level: DataTypes.INTEGER,
    wordCount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    seen: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    time: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    articleSourceId: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
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
        Article.hasMany(models.comment);
        Article.belongsToMany(models.user, {
          through: models.articleHistory
        });
      }
    }
  });
  return Article;
};