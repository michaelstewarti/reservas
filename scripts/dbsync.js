const { sequelize } = require('../models');

sequelize
  .authenticate()
  .then(() => console.log('Connection ok... ✅'))
  .catch(console.error);

sequelize
  .sync({ force: true, logging: console.log })
  .then(() => console.log('Sync ok... ✅'))
  .catch(console.error);
