module.exports = member => {
  let guild = member.guild;
  guild.channels.get(config.defaultChannel).send(`Please welcome ${member.user.username} to the server!`);
};
