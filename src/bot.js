const { BotClient, defaultCommands } = require('sensum');
const { Intents, Collection } = require('discord.js');

const { DISCORD_TOKEN } = require('./config');
const Redirect = require('./models/redirect.model');

const bot = new BotClient(
  {
    intents: [
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  },
  {
    token: DISCORD_TOKEN,
    root: __dirname,
    debug: true,
    ownerID: '517599684961894400',
    prefix: process.env.NODE_ENV === 'production' ? '!' : '>',
  },
);

defaultCommands.forEach(bot.loadCommand.bind(bot));

bot.redirects = new Collection();

bot
  .login()
  .then(() => {
    return Redirect.find({});
  })
  .then((redirects) => {
    for (const redirect of redirects) {
      if (!bot.redirects.has(redirect.guildId)) {
        bot.redirects.set(redirect.guildId, new Collection());
      }
      bot.redirects.get(redirect.guildId).set(redirect.emoji, redirect);
    }
    console.log(`Logged in as ${bot.user.tag}`);
    console.log('---------------');
    console.log(bot.commands.size, 'commands loaded.');
    console.log([...bot.commands.keys()].join(', ') + '.');
    console.log(bot.schedule.tasks.length, 'tasks loaded.');
    console.log(bot.schedule.tasks.map((t) => t.name).join(',') + '.');
    console.log(`Loading ${redirects.length} redirects for ${bot.redirects.size} guilds.`);
    console.log('---------------');
  });

process.on('beforeExit', () => {
  bot.destroy();
});

module.exports = bot;
