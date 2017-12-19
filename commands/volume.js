exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply('You must join a voice channel.');
  }

  const vol = args.join(' ');
  if (!vol) return message.channel.sendMessage(`Current volume is set to ${client.playlists.get(message.guild.id).dispatcher.volume * 100}%.`);
  if (vol < 0 || vol > 100) return message.reply('Volume must be a value between 0% and 100%!');

  message.channel.send(`Setting volume to ${vol}%!`).then(() => {
    message.guild.voiceConnection.volume = vol / 100;
    client.playlists.get(message.guild.id).dispatcher.setVolume(vol / 100);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['v', 'vol'],
  permLevel: 'User'
};

exports.help = {
  name: 'volume',
  category: 'Music',
  description: 'Sets the volume of the audio stream in the channel.',
  usage: 'volume <value>'
};
