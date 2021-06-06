const { Command } = require('sensum');

module.exports = new Command({
  name: 'memory',
  description: 'Shows system memory information.',
  category: 'maintenance',
  aliases: ['mem'],
  hidden: true,
  run(bot, message, ctx) {
    const memory = bot.memory;
    console.log('memory: ', memory);
    this.send(
      '```\n' +
        JSON.stringify(
          {
            bot: Math.trunc(memory.bot / 1024 / 1024) + 'MB',
            free: Math.trunc(memory.free / 1024 / 1024) + 'MB',
            total: Math.trunc(memory.total / 1024 / 1024) + 'MB',
          },
          null,
          2,
        ) +
        '\n```',
    );
  },
});
