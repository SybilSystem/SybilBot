const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready',() => {
  console.log("I'm online and ready to serve!");
});

client.on('guildDelete', guild => {
  console.log(`I have left ${guild.name} at ${new Date()}`);
});

client.on('guildCreate', guild => {
  guild.channels.get(config.defaultChannel).send(`I have joined \`${guild.name}\``);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.channels.get(config.defaultChannel).send(`Please welcome ${member.user.username} to the server!`);
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.channels.get(config.defaultChannel).send(`Goodbye, ${member.user.username}!`);
});

var prefix = "?"

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.bot) return;


  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }
});

client.login(config.token);
