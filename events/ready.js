const chalk = require('chalk');

module.exports = async client => {
  await client.wait(1000);
  client.log('Ready', chalk.bgGreen.black(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'Ready!'));
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
};