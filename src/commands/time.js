const { Command } = require('sensum');
const toCron = require('human-to-cron');
const toHuman = require('cronstrue').toString;
const chrono = require('chrono-node');
const { MessageEmbed } = require('discord.js');

const moment = require('moment');

module.exports = new Command({
  name: 'time',
  description: 'Parse timing into cron and back.',
  category: 'admin',
  hidden: true,
  run(bot, message, ctx) {
    const msg = ctx.content;
    let cron = null;
    let human = null;
    let relative = null;
    try {
      cron = toCron(msg);
    } catch {
      /* ok */
    }
    try {
      relative = chrono.parseDate(msg);
    } catch {
      /* ok */
    }
    try {
      try {
        human = toHuman(msg);
      } catch {
        /* ok */
        if (cron && !msg.includes('*') && cron !== '* * * * * *') {
          human = toHuman(cron);
        }
        if (!human && relative) {
          human = moment(relative).calendar();
        }
      }
    } catch {}
    this.send({
      embed: new MessageEmbed({
        title: 'Timing Parser',
        fields: [
          { name: 'Original', value: msg },
          { name: 'Cron Expression', value: cron },
          { name: 'Human Readable', value: human ?? 'None' },
          { name: 'Relative Time', value: moment(relative).fromNow() },
        ],
      }),
    });
  },
});
