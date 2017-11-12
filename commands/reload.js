const main = require('../bot.js');
exports.run = function(client, message, args) {
  let cmd = args.join(' ');
  main.reload(message, cmd);
}
