const Discord = require('discord.js');

module.exports = (guild, user) => {

  guild.channels.get(config.defaultChannel).send(`${user.username} was just unbanned!`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00F8FF)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag} (${user.id}))\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    return client.channels.get(modlog.id).send({embed});
};
