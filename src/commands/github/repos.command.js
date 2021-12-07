const { Command, TextHelpers } = require('sensum');
const moment = require('moment');

const Github = require('../../services/github.service');

module.exports = new Command({
  name: 'repos',
  description: 'Get repo data.',
  category: 'code',
  aliases: ['repo'],
  args: {
    limit: {
      type: 'number',
      default: 5,
      convert: true,
    },
  },
  delete: false,
  hidden: true,
  async run(bot, message, ctx) {
    const limit = ctx.args.limit;
    const repos = await Github.getRepos(limit);
    message.channel.send(
      TextHelpers.lines(
        ...repos
          .map((repo) => ({ name: repo.name, lastUpdate: repo.updated_at }))
          .map((r) => `**📄 ${r.name}**  📆 ${moment(r.lastUpdate).fromNow()}`),
      ),
      { split: true },
    );
  },
});
