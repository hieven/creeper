module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define('word', {
    word: DataTypes.STRING,
    definition: DataTypes.STRING,
    kk: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Word.hasMany(models.wordCollection);
      }
    }
  });
  return Word;
};