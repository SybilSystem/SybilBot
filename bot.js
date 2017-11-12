if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

//Dependencies
const Discord = require('discord.js');
const ddiff = require('return-deep-diff');
const chalk = require('chalk');
const client = new Discord.Client();
const config = require('./config.json');
require('./util/eventLoader.js')(client);

//Reload
var reload = (message, cmd) => {
	delete require.cache[require.resolve('./commands/' + cmd)];
	try {
		let cmdFile = require('./commands/' + cmd);
	} catch (err) {
		message.channel.send(`Problem loading ${cmd}: ${err}`).then(
			response => response.delete(1000).catch(error => console.log(error.stack))
		).catch(error => console.log(error.stack));
	}
	message.channel.send(`${cmd} reload was a success!`).then(
		response => response.delete(1000).catch(error => console.log(error.stack))
	).catch(error => console.log(error.stack));
};
exports.reload = reload;

//Debugging and Error logging
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g; //Redacts token in debug logging.

//client.on('debug', e => {
// console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
//});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

//Discord Login
client.login(config.token);
