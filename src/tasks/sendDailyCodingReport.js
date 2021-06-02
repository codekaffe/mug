const { Task } = require('sensum');

const Github = require('../services/github.service');
const Wakatime = require('../services/wakatime.service');

const moment = require('moment');

module.exports = new Task({
  name: 'Send Daily Report',
  time: '0 0 22 * * *',
  async run(bot, fireDate) {
    const channel = bot.guilds.cache
      .get('683463960501944327')
      .channels.cache.get('849432685285605376');

    const repos = await Github.getRepos(5);

    const summaries = await Wakatime.getSummaries();

    const wakatimeReport = bot.lines(
      `📆 **Today's Summary** ${moment().tz('America/Sao_Paulo').format('MMMM Do, YYYY')}`,
      '',
      `Total coding time: ${summaries.cummulative_total.text}`,
      '',
      '⌨ **Editors**',
      ...(summaries.data[0]?.editors.map((e) => `◽ ${e.digital}  ${e.name}`) ?? ['---']),
      '',
      '🔤 **Languages**',
      ...(summaries.data[0]?.languages.map((l) => `◽ ${l.digital}  ${l.name}`) ?? ['---']),
      '',
      '📚 **Projects**',
      ...(summaries.data[0]?.projects.map((p) => `◽ ${p.digital}  ${p.name}`) ?? ['---']),
    );

    const githubReport = bot.lines(
      ...repos
        .map((repo) => ({ name: repo.name, lastUpdate: repo.updated_at }))
        .map(
          (r) => `**📄 ${r.name}**  📆 ${moment(r.lastUpdate).tz('America/Sao_Paulo').fromNow()}`,
        ),
    );

    channel.send(bot.lines(wakatimeReport, '', '📊 **Recent Projects**', githubReport), {
      split: true,
    });
  },
});
