const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'messageReactionAdd',
  run(bot, reaction) {
    if (reaction.message.channel.id === '888472757900288090') {
      if (['☑️', '✔️', '✅', '❤️'].includes(reaction.emoji.name)) {
        reaction.message.delete().catch(console.log);
      }
    } else {
      const msg = message.content.replace('todo:', '').trim();
      const c = bot.guilds.cache.get('683463960501944327').channels.cache.get('888472757900288090');
      if (c instanceof TextChannel) {
        c.send(`- ${msg}`)
          .then(() => reaction.message.delete())
          .catch(() => {});
      }
    }
  },
});
