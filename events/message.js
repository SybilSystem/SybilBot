const config = require('../config.json')
module.exports = message => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;

  const client = message.client;
  var prefix = config.prefix;
  const args = message.content.split(' ');
  const command = args.shift().slice(config.prefix.length);

  try {
    let cmdFile = require(`../commands/${command}`);
    cmdFile.run(client, message, args);
  } catch (err) {
    console.log(`Command ${command} failed\n${err.stack}`);
  }
};
