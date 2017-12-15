//===========================
//Node.JS Version Check
//===========================

if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

//===========================
//Dependencies
//===========================

const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const client = new Discord.Client();
const config = require('./config.json');
require('./util/eventLoader.js')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//===========================
//Command Handler
//===========================

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.playlists = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command - ${props.help.name}: ✅`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

//===========================
//Reload Function
//===========================

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//===========================
//User Permissions
//===========================

client.elevation = message => {
  let permlvl = 0;
  const modRole = message.guild.roles.find('name', config.modrolename);
  if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
  const adminRole = message.guild.roles.find('name', config.adminrolename);
  if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
  if (message.author.id === config.ownerid) permlvl = 4;
  return permlvl;
};

//===========================
//Debugging and Error logging
//===========================

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g; //Redacts token in debug logging.
client.on('debug', e => {
  console.log(e.replace(regToken, (chalk.red('in config.json.'))));
});

client.emit('warn',e => {
  console.log(chalk.bgYellow(e));
});

client.on('error', e => {
  console.log(chalk.bgRed(e));
});

//===========================
//Discord Login
//===========================

client.login(config.token);
