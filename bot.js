const Discord = require('discord.js');
const ddiff = require('return-deep-diff');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');


//Connection Events
client.on('ready',() => {
  console.log(chalk.bgGreen("I'm online and ready to serve!"));
});

client.on('disconnect', () => {
  console.log(`You have been disconnected at ${new Date()}`);
});

client.on('reconnecting', () => {
  console.log(`Reconnecting at ${new Date()}`);
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
client.on('channelCreate', channel => {
  console.log(`A ${channel.type} channel called ${channel.name} was created at ${channel.createdAt} with the ID of ${channel.id}`);

});

client.on('channelDelete', channel => {
  console.log(`The ${channel.type} channel, ${channel.name} was successfully deleted.`);

});

client.on('channelUpdate', (oChannel, nChannel) => {
  console.log(ddiff(oChannel, nChannel));
});

client.on('channelPinsUpdate', (channel, time) => {
  console.log(`The pins for ${channel.name} have been updated at ${time}`);
});

client.on('messageDeleteBulk', messages => {
  console.log(`${messages.size} was deleted`);
});

//Role Events
client.on('roleCreate', role => {
  let guild = role.guild;
  guild.channels.get(config.defaultChannel).send(`A new role called ${role.name} has been created`)
});

client.on('roleDelete', role => {
  let guild = role.guild;
  guild.channels.get(config.defaultChannel).send(`A new role called ${role.name} has been deleted`)
});

client.on('roleUpdate', (oRole, nRole) => {
  console.log(ddiff(oRole, nRole));
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
  } else

  if (message.content.startsWith(prefix + 'purge')) {
    let messagecount = parseInt(result);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  } else

  if (message.content.startsWith(prefix + 'setgame')) {
   if (!result) {
     result = null;
   }
   client.user.setGame(result);
 } else

 if (message.content.startsWith(prefix + 'setstatus')) {
   if (!result) {
     result = 'online';
   }
   client.user.setStatus(result);
 } else

 if (message.content.startsWith(prefix + 'foo')) {
   message.channel.sendMessage('bar');
 }

});


//Debugging and Error logging

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g; //Redacts token in debug logging.
client.on('debug', e => {
  console.log(chalk.bgBlue(e.replace(regToken, 'that was redacted')));
 });

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

//Discord Login
client.login(config.token);
