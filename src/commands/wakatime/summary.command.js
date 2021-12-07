const { Command } = require('sensum');
const Wakatime = require('../../services/wakatime.service');

module.exports = new Command({
  name: 'summary',
  description: 'Wakatime summaries.',
  category: 'code',
  aliases: ['sum'],
  args: {
    category: {
      type: 'string',
      optional: true,
    },
  },
  delete: false,
  hidden: true,
  async run(bot, message, ctx) {
    const summaries = await Wakatime.getSummaries();

    message.channel.send(
      bot.lines(
        "📆 **Today's Summary**",
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
      ),
    );
  },
});
