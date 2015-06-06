module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [queryInterface.addColumn('articles', 'source', Sequelize.TEXT),
      queryInterface.addColumn('articles', 'level', Sequelize.INTEGER),
      queryInterface.addColumn('articles', 'length', Sequelize.INTEGER),
      queryInterface.addColumn('articles', 'status', Sequelize.TEXT),
    ];
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [queryInterface.removeColumn('articles', 'source'),
      queryInterface.removeColumn('articles', 'level'),
      queryInterface.removeColumn('articles', 'length'),
      queryInterface.removeColumn('articles', 'status')
    ];
  }
};