exports.run = (client, message) => {
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    console.log(1);
    return message.reply('You must join a voice channel to stop playback.');
  }

  if (client.playlists.has(message.guild.id)) {
    console.log(2);
    const queue = client.playlists.get(message.guild.id);
    console.log(3);
    queue.queue = [];
    console.log(4);
    queue.dispatcher.end();
  }
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'stop',
  description: 'Ends the current playlist.',
  usage: 'stop'
};
