const { BotClient, defaultCommands } = require('sensum');

const { Intents } = require('discord.js');
const { DISCORD_TOKEN } = require('./config');

const intents = new Intents();
intents.add(Intents.NON_PRIVILEGED, Intents.FLAGS.GUILD_PRESENCES);

const bot = new BotClient(
  {
    token: DISCORD_TOKEN,
    root: __dirname,
    debug: true,
    ownerID: '517599684961894400',
  },
  {
    ws: {
      intents: [intents.bitfield],
    },
  },
);

defaultCommands.forEach(bot.loadCommand.bind(bot));

bot.login().then(() => {
  console.log(`Logged in as ${bot.user.tag}`);
  console.log('---------------');
  console.log(bot.commands.size, 'commands loaded.');
  console.log([...bot.commands.keys()].join(', ') + '.');
  console.log(bot.schedule.tasks.length, 'tasks loaded.');
  console.log(bot.schedule.tasks.map((t) => t.name).join(',') + '.');
  console.log('---------------');
});

process.on('beforeExit', () => {
  bot.destroy();
});

module.exports = bot;
