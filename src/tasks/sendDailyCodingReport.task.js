const { Task } = require('sensum');
const { MessageEmbed } = require('discord.js');

const Github = require('../services/github.service');
const Wakatime = require('../services/wakatime.service');

const moment = require('moment');

module.exports = new Task({
  name: 'Send Daily Coding Report',
  time: '0 0 23 * * *',
  async run(bot, fireDate) {
    const channel = bot.guilds.cache
      .get('683463960501944327')
      .channels.cache.get('849432685285605376');

    const repos = await Github.getRepos(5);

    const summaries = await Wakatime.getSummaries();

    const wakatimeReport = bot.lines(
      `Total coding time: ${summaries.cummulative_total.text} (${summaries.cummulative_total.digital})`,
    );

    const githubReport = bot.lines(
      ...repos
        .map((repo) => ({ name: repo.name, lastUpdate: repo.updated_at }))
        .map(
          (r) => `**📄 ${r.name}**  📆 ${moment(r.lastUpdate).tz('America/Sao_Paulo').fromNow()}`,
        ),
    );

    const wakatimeDataFormatter = (data) => {
      return (
        data?.filter((e) => e.total_seconds > 120).map((e) => `◽ ${e.digital}  ${e.name}`) ?? [
          '---',
        ]
      ).join('\n');
    };

    const embed = new MessageEmbed({
      title: `📆 **Today's Summary** (${moment().tz('America/Sao_Paulo').format('MMMM Do, YYYY')})`,
      description: wakatimeReport,
      fields: [
        {
          name: '⌨ **Editors**',
          inline: true,
          value: wakatimeDataFormatter(summaries.data[0]?.editors),
        },
        {
          name: '🔤 **Languages**',
          inline: true,
          value: wakatimeDataFormatter(summaries.data[0]?.languages),
        },
        {
          name: '📚 **Projects**',
          inline: true,
          value: wakatimeDataFormatter(summaries.data[0]?.projects),
        },
        {
          name: '📊 **Recent Projects**',
          inline: true,
          value: githubReport,
        },
      ],
    });

    channel.send({
      embed,
    });
  },
});
