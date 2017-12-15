exports.run = (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply('You must join a voice channel to stop playback.');
  }
  
  if (client.playlists.has(message.guild.id)) {
    const queue = client.playlists.get(message.guild.id);
    queue.queue = [];
    queue.dispatcher.end();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'stop',
  description: 'Ends the current playlist.',
  usage: 'stop'
};
