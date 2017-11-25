const config = require('../config.json');

module.exports = member => {
  const guild = member.guild;
  guild.channels.get(config.defaultChannel).send(`Please welcome ${member.user.username} to the server!`);
};
