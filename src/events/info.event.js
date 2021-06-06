const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'info',
  run(bot, err) {
    console.log(err);
  },
});
