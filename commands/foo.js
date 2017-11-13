exports.run = function(client, message) {
  message.channel.send('bar');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'foo',
  description: 'Foo/Bar test command. Clearly for testing purposes and nothing else.',
  usage: 'foo'
};
