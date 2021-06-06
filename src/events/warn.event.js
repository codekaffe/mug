const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'warn',
  run(bot, err) {
    console.log(err);
  },
});
