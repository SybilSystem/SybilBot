module.exports = member => {
  let guild = member.guild;
  guild.channels.get(config.defaultChannel).send(`Goodbye, ${member.user.username}!`);
};
