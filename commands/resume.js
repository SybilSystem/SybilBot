exports.run = (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply('You must join a voice channel to resume the stream.');
  }
  if (!client.playlists.get(message.guild.id).dispatcher.paused) return message.reply('Audio playback has not been paused.');
  message.channel.send('Resuming playback.');
  client.playlists.get(message.guild.id).dispatcher.resume();
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'resume',
  description: 'Resumes the current audio stream',
  usage: 'resume'
};
