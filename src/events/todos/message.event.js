const { TextChannel } = require('discord.js');
const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'message',
  run(bot, message) {
    if (message.content.startsWith('todo:')) {
      const msg = message.content.replace('todo:', '').trim();
      const c = bot.guilds.cache.get('683463960501944327').channels.cache.get('888472757900288090');
      if (c instanceof TextChannel) {
        c.send(`- ${msg}`)
          .then(() => message.delete())
          .catch(() => {});
      }
    }
  },
});
