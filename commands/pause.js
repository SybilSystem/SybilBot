exports.run = (client, message) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply('You must join a voice channel to pause the stream.');
  }
  if (client.playlists.get(message.guild.id).dispatcher.paused) return message.reply('Playback has already been paused');
  message.channel.send('Pausing playback.');
  client.playlists.get(message.guild.id).dispatcher.pause();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p'],
  permLevel: 'User'
};

exports.help = {
  name: 'pause',
  category: 'Music',
  description: 'Pauses the current audio stream',
  usage: 'pause'
};
