const Discord = require('discord.js');
const ddiff = require('return-deep-diff');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready',() => {
  console.log("I'm online and ready to serve!");
});

//Guild Events
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

client.on('guildMemberUpdate', (oMember, nMember) => {
  console.log(ddiff(oMember, nMember));
});

client.on('guildUpdate', (oGuild, nGuild) => {
  console.log(ddiff(oGuild, nGuild));
});

client.on('guildBanAdd', (Guild, User) => {
  guild.channels.get(config.defaultChannel).send(`${user.username} has been banned!`);
});

client.on('guildBanRemove', (Guild, User) => {
  guild.channels.get(config.defaultChannel).send(`${user.username} has been unbanned!`);
});

//Client Events
client.on('channelCreate'. channel => {
  console.log(`A ${channel.type} channel called ${channel.name} was created at ${channel.createdAt} with the ID of ${channel.id}`);

});

client.on('channelDelete'. channel => {
  console.log(`The ${channel.type} channel, ${channel.name} was successfully deleted.`);

});

client.on('channelUpdate', (oChannel, nChannel) => {
  console.log(ddiff(oChannel, nChannel));
});

//Prefix
var prefix = "?"

//Command Handler
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.bot) return;


  if (message.content.startsWith(prefix + 'ping')) {
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }
});


//Discord Login
client.login(config.token);
