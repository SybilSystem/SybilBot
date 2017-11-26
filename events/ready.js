const config = require('../config.json');
const chalk = require('chalk');

module.exports = client => { //eslint-disable-line no-unused-vars
  console.log(chalk.bgGreen.black('I\'m online and ready to serve!'));
  client.user.setGame(`${config.prefix}help`);
};
