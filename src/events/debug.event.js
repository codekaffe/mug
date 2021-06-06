const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'debug',
  enabled: false,
  run(bot, err) {
    console.log(err);
  },
});
