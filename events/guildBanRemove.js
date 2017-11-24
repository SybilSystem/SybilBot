const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (guild, message, user) => {

  guild.channels.get(config.defaultChannel).send(`${user.tag} was just unbanned!`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  return guild.channels.get(guild.channels.find('name', 'mod-log').id).send({
    embed
  });

};
