const { Task, EventHandler } = require('sensum');
const mongoose = require('mongoose');
const m = require('moment');

const Reminder = require('../models/reminder.model');
const config = require('../config');
const Reminders = require('../services/reminders.service');
const { TextChannel } = require('discord.js');
const moment = (...args) => m(...args).tz('America/Sao_Paulo');

const wait = (milliseconds) => new Promise((r) => setTimeout(r, milliseconds));

function waitingForDb() {
  return new Promise(async (resolve) => {
    while (!config.db()) {
      await wait(500);
    }
    resolve();
  });
}

module.exports = new EventHandler({
  name: 'ready',
  async run(bot) {
    if (!config.db()) {
      await waitingForDb();
    }

    const reminders = await Reminder.find({}).limit(5).sort('fireDate');
    Reminders.scheduleSavedReminders(bot, reminders);
    const todosChannel = bot.guilds.cache
      .get('683463960501944327')
      .channels.cache.get('888472757900288090');
    if (todosChannel instanceof TextChannel) {
      await todosChannel.messages.fetch({}, true, true);
    }
  },
});
