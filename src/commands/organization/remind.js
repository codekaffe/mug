const { Command } = require('sensum');
const moment = require('moment');

const Time = require('../../services/time.service');
const Reminder = require('../../models/reminder.model');

module.exports = new Command({
  name: 'remind',
  description: 'Have Overseer remind you about something at a set time.',
  category: 'organization',
  aliases: ['rem'],
  args: ['time'],
  delete: false,
  hidden: false,
  usage: '{time} [your reminder]',
  examples: [
    '2h go have lunch',
    '1d go talk to blu',
    '6d homework due tomorrow',
    '20min time to go get the laundry',
  ],
  async run(bot, message, ctx) {
    const { duration } = Time.parse(ctx.args.shift());

    if (!duration) {
      await this.send(
        `That\'s not a valid timeframe, try using **${bot.config.defaultSettings.prefix}help remind** for command usage and examples.`,
      );
      return;
    }

    const content = ctx.args.join(' ').trim() || 'this moment';
    const userId = message.author.id;
    const channel = message.channel.id;

    const fireDate = moment()
      .tz('America/Sao_Paulo')
      .add(duration / 1000, 'seconds');

    const reminder = new Reminder({ content, userId, channel, fireDate });

    await reminder.save();

    this.send(
      `Okay! I'll remind you **${Time.fromNow(
        duration / 1000,
      )}** (${fireDate.calendar()}) about "${content}" ${message.author}`,
    );
  },
});
