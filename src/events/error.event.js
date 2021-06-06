const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'error',
  run(bot, err) {
    console.log(err);
  },
});
