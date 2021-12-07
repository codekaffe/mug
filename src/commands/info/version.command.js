const { Command, TextHelpers } = require('sensum');
const fs = require('fs');
const path = require('path');

let versionsCache;

module.exports = new Command({
  name: 'version',
  description: "Shows The bot's version.",
  category: 'info',
  aliases: ['ver'],
  async run(bot, message, ctx) {
    const versionFile = versionsCache
      ? versionsCache
      : JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../version.txt'), 'utf-8'));
    versionsCache = versionFile;
    const { versionName, versionNumber } = versionsCache;

    this.send(
      TextHelpers.lines(
        `**Alice** v${bot.version}-${versionNumber}-${versionName}`,
        `**Sensum**   v${require('sensum/package.json').version}`,
        `**Node**        ${process.version}`,
      ),
    );
  },
});
