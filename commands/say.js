exports.run = (client, message, args) => {
  const sayMessage = args.join(' ');
  message.delete().catch(error => {
    console.log(error);
  });
  message.channel.send(sayMessage);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'say',
  category: 'Moderation',
  description: 'Allows moderators to say things using the bot.',
  usage: 'say <message goes here>'
};
