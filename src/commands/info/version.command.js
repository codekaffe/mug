const { Command } = require('sensum');
const calculateVersion = require('../../version');

module.exports = new Command({
  name: 'version',
  description: "Shows Overseer's version.",
  category: 'info',
  aliases: ['ver'],
  async run(bot, message, ctx) {
    const { versionName, versionNumber } = await calculateVersion();
    this.send(
      bot.lines(
        `**Overseer** v${bot.version}-${versionNumber}-${versionName}`,
        `**Sensum**   v${require('sensum/package.json').version}`,
        `**Node**        ${process.version}`,
      ),
    );
  },
});
