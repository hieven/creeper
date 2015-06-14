module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define('word', {
    word: DataTypes.STRING,
    definitions: DataTypes.STRING,
    kk: DataTypes.STRING,

    difficulty: {
      type: DataTypes.DOUBLE,
      validate: {
        max: 13,
        min: 0
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Word.belongsToMany(models.user, {
          through: models.wordCollection
        });
      }
    }
  });
  return Word;
};