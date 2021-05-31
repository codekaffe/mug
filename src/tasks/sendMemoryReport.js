const { Task } = require('sensum');

module.exports = new Task({
  name: 'Send Daily Report',
  time: '0 */30 * * * *',
  run(bot, fireDate) {
    const channel = bot.guilds.cache
      .get('683463960501944327')
      .channels.cache.get('839697528093802546');
    if (channel.type === 'text') {
      const memory = bot.memory;
      const botUsage = Math.trunc(memory.bot / 1024 / 1024) + 'MB';
      const totalPercentUsage = Math.trunc(memory.percent * 100);
      channel.send(
        bot.lines(`🔋 Bot Memory Usage: **${botUsage}** --- 🧮 **${totalPercentUsage}%** Used.`),
      );
    }
  },
});
