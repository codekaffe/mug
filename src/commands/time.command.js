const { Command } = require('sensum');
const { MessageEmbed } = require('discord.js');

const Time = require('../services/time.service');

module.exports = new Command({
  name: 'time',
  description: 'Parse timing into cron and back.',
  category: 'admin',
  args: {
    time: { type: 'any', default: new Date() },
  },
  hidden: true,
  run(bot, message, ctx) {
    const { cron, human, original, relative, duration } = Time.parse(ctx.content || ctx.args.time);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    this.send({
      embed: new MessageEmbed({
        title: 'Timing Parser',
        fields: [
          { name: 'Original', value: original },
          { name: 'Cron Expression', value: cron },
          { name: 'Human Readable', value: human },
          { name: 'Relative Time', value: relative },
          { name: 'Duration', value: duration + ` (${Time.fromNow(duration / 1000)})` },
          { name: 'Calendar', value: duration + ` (${Time.calendarFromNow(duration / 1000)})` },
        ],
      }),
    });
  },
});
