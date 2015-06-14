module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
    level: {
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
        User.hasMany(models.favorite);
        User.hasMany(models.subscription);
        User.hasMany(models.comment);

        User.belongsToMany(models.article, {
          through: models.articleHistory
        });

        User.belongsToMany(models.word, {
          through: models.wordCollection
        });
      }
    }
  });
  return User;
};