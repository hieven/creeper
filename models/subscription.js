module.exports = function(sequelize, DataTypes) {
  var Subscription = sequelize.define('subscription', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Subscription.belongsTo(models.user);
        Subscription.belongsTo(models.category);
      }
    }
  });
  return Subscription;
};