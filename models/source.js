module.exports = function(sequelize, DataTypes) {
  var Source = sequelize.define('source', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    
  }, {
    classMethods: {
      associate: function(models) {
        Source.hasMany(models.article);
      }
    }
  });
  return Source;
};