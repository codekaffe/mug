const { Command } = require('sensum');
const moment = require('moment');

const Github = require('../../services/github.service');

module.exports = new Command({
  name: 'repos',
  description: 'Get repo data.',
  category: 'code',
  aliases: ['repo'],
  // args: ['limit'],
  delete: false,
  hidden: true,
  async run(bot, message, ctx) {
    const [limit] = ctx.args;
    const repos = await Github.getRepos(Number(limit));
    this.send(
      bot.lines(
        ...repos
          .map((repo) => ({ name: repo.name, lastUpdate: repo.updated_at }))
          .map((r) => `**📄 ${r.name}**  📆 ${moment(r.lastUpdate).fromNow()}`),
      ),
      { split: true },
    );
  },
});
