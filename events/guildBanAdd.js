const config = require('../config.json');

module.exports = (guild, user) => {
  guild.channels.get(config.defaultChannel).send(`${user.tag} has been banned!`);
};
