module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: DataTypes.TEXT,
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    articleId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {

        Comment.belongsTo(models.article);
        Comment.belongsTo(models.user);
      }
    }
  });
  return Comment;
};