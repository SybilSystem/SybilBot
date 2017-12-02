exports.run = (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply('You must join a voice channel to pause the stream.');
  }
  if (!client.playlists.get(message.guild.id).dispatcher.paused) return message.reply('Audio playback has not been paused.');
  message.channel.send('Pausing playback.');
  client.playlists.get(message.guild.id).dispatcher.pause();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],
  permLevel: 2
};

exports.help = {
  name: 'pause',
  description: 'Pauses the current audio stream',
  usage: 'pause'
};
