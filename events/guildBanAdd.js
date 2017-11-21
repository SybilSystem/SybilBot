const config = require('../config.json')

module.exports = (guild, user) => {
  guild.channels.get(config.defaultChannel).send(`${user.username} has been banned!`);
};
