const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'messageReactionAdd',
  run(bot, reaction) {
    if (reaction.message.channel.id !== '888472757900288090') return;
    if (['☑️', '✔️', '✅', '❤️'].includes(reaction.emoji.name)) {
      reaction.message.delete().catch(console.log);
    }
  },
});
