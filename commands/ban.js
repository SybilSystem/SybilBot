const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log')
  if (!modlog) return message.reply('I cannot find a mod-log channel.');
  if (reason.lenth < 1) return message.reply('Please supply a reason to ban the user.')
  if (message.mentions.users.size < 1) return message.reply('You must mention the user you want to ban.').catch(console.error);

  if (!message.guild.member(user).banable) return message.reply('I cannot ban that member.');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0xFF2D00)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag} (${user.id}))\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user from the server.',
  usage: 'ban <mention> <reason>'
};
