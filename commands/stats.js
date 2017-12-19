const {version} = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, message) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  message.channel.send(`= BOT STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {
    code: 'asciidoc'
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['info'],
  permLevel: 'User'
};

exports.help = {
  name: 'stats',
  category: 'System',
  description: 'Bot technical statistics.',
  usage: 'stats'
};