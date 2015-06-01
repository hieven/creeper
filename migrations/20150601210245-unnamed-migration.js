module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, {
      engine: 'InnoDB',
      charset: 'utf8'
    });
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};