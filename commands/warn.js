const client = require('discord.js');
const {caseNumber} = require('../functions/caseNumber.js');
const {parseUser} = require('../functions/parseUser.js');
client.config = require('../config.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', client.config.modLogChannel);
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${config.prefix}reason ${caseNum} <reason>.`;
  const embed = new client.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'warn',
  category: 'Moderation',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};
