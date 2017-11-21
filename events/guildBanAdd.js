module.exports = (guild, user) => {
  guild.defaultChannel.send(`${user.tag} has been banned!`);
};
