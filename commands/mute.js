const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users .first();
  let muteRole = client.guid.get(message.guild.id).find('name', 'muted');
  let modlog = client.channels.find('name', 'mod-log')
  if (!modlog) return message.reply('I cannot find a mod-log channel.').catch(console.error);
  if (!muteRole) return message.reply('I cannot find a mute role.').catch(console.error);
  if (reason.lenth < 1) return message.reply('A reason for the mute is required.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('A user must be mentioned to mute them.').catch(console.error);

  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mutes or unmutes the mentioned user.',
  usage: '(un)mute <mention>'
};
