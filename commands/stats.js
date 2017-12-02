exports.run = (client, message) => {
  const totalPlaylists = client.playlists.array().reduce((prev, curr, ) => prev + curr.playlist.length, 0);
  const totalGuilds = client.playlists.array().filter(q => !!q.dispatcher).length;

  message.channel.send(`Currently queuing a total of ${totalPlaylists} songs on ${totalGuilds} servers for a total of ${totalPlaylists + totalGuilds} songs!`);
};

exports.conf = {
  aliases: ['info'],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays technical data about current audio streams.',
  usage: 'stats'
};
