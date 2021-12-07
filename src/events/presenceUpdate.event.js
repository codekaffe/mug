const { EventHandler, TextHelpers } = require('sensum');
const moment = require('moment');

const statuses = {
  online: '🟢',
  offline: '💤',
  idle: '🟠',
  dnd: '🔴',
};

module.exports = new EventHandler({
  name: 'presenceUpdate',
  enabled: false,
  async run(bot, _, presence) {
    if (presence.member.id !== bot.config.ownerID) {
      return;
    }

    const custom = presence.activities.find((a) => a.type === 'CUSTOM_STATUS');
    const status = presence.status;
    const emoji = custom?.emoji?.name;

    let activity;

    if (custom && custom.name !== 'Custom Status') {
      activity = custom.name;
      console.log(1);
    }
    if (!activity && custom && custom.state) {
      activity = custom.state;
    }
    if (!activity && presence.activities.length > 1) {
      activity = presence.activities[1].name;
    }
    if (!activity && presence.activities.length > 0) {
      activity = presence.activities[0].name;
    }
    presence.guild.channels.cache
      .get('848722636565381140')
      .send(
        TextHelpers.lines(
          `[${moment().tz('America/Sao_Paulo').format('MM/DD/YY hh:mma')}] ${
            emoji ?? statuses[status] ?? '🏐'
          } **${status.toUpperCase()}** ${activity ? '- ' + activity : ''}`,
        ),
      );
  },
});
