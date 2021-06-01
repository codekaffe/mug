const { Command } = require('sensum');

const Time = require('../../services/time.service');

module.exports = new Command({
  name: 'remind',
  description: 'Have Overseer remind you at a set time.',
  category: 'organization',
  aliases: ['rem'],
  args: ['time'],
  delete: false,
  hidden: false,
  run(box, message, ctx) {
    const { duration } = Time.parse(ctx.args.shift());
    this.send(
      `Okay! I'll remind you **${Time.fromNow(duration / 1000)}** to ${ctx.args.join(' ')}`,
    );
  },
});
