const Discord = require('discord.js');
const config = require('../config.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'mod-log')
  if (!modlog) return message.reply('I cannot find a mod-log channel.');
  if (reason.lenth < 1) return message.reply('Please supply a reason to kick the user.')
  if (message.mentions.users.size < 1) return message.reply('You must mention the user you want to kick.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member.');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0xFF8700)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag} (${user.id}))\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kick'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user from the server.',
  usage: 'kick <mention> <reason>'
};
