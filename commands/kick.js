const {RichEmbed} = require('discord.js');
const {parseUser} = require('../functions/parseUser.js');

exports.run = async (client, message, args) => {
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;

  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await client.caseNumber(client, modlog);
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  //message.guild.member(user).kick();

  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kick'],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'kick',
  category: 'Moderation',
  description: 'Kicks the mentioned user from the server.',
  usage: 'kick <mention> <reason>'
};
