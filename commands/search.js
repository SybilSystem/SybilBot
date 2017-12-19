const ytapi = require('simple-youtube-api');


exports.run = async (client, message, args) => {
  const youtube = new ytapi(client.config.youtubeAPIKey);
  const search = args.join(' ');
  try {
    const results = await youtube.searchVideos(search, 5);
    return message.channel.send(`Top 5 Results\n\n  ${results.map(i => `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n')}`, {
      code: true
    });
  } catch (e) {
    message.reply(e.message);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'search',
  category: 'Music',
  description: 'Finds songs on YouTube.',
  usage: 'search <search term>'
};
