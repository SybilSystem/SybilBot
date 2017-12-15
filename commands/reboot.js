exports.run = async (client, message) => {
  message.channel.send('Are you sure that you want to reboot? (yes/no)\n\nReply with `cancel` to abort. Reboot will cancel automatically in 30 seconds.');

  const validAnswers = ['y', 'yes', 'n', 'no', 'cancel'];
  const collector = message.channel.createMessageCollector(m => m.author.id === m.author.id, {
    time: 30000
  });

  collector.on('message', async m => {
    const lower = m.content.toLowerCase();
    if (lower === 'cancel' || lower === 'no' || lower === 'n') {
      return collector.stop('abort');
    } else if (lower === 'yes' || lower === 'y') {
      return collector.stop('kill');
    }
    return message.channel.send(`Please use \`${validAnswers.join('`, `')}\` to reboot.`);
  });

  collector.on('end', async (collected, reason) => {
    if (reason === 'kill') {
      await message.channel.send('Rebooting now, please wait!');
      await client.destroy();
      process.exit();
    } else if (reason === 'time') {
      return message.channel.send('Reboot timed out.');
    } else if (reason === 'abort') {
      return message.channel.send('Reboot aborted!');
    }
  });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'reboot',
  description: 'Reboots the bot via PM2',
  usage: 'reboot'
};
