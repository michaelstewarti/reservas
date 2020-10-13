'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = `alter table mesas drop column apellido;`;
    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    });
  },

  down: async () => Promise.resolve(),
};
