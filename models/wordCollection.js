module.exports = function(sequelize, DataTypes) {
  var WordCollection = sequelize.define('wordCollection', {
    userId: DataTypes.INTEGER,
    wordId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        WordCollection.belongsTo(models.user);
        WordCollection.belongsTo(models.word);
      }
    }
  });
  return WordCollection;
};