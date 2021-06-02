const { Task } = require('sensum');
const mongoose = require('mongoose');
const m = require('moment');

const Reminder = require('../models/reminder.model');
const config = require('../config');
const Reminders = require('../services/reminders.service');
const moment = (...args) => m(...args).tz('America/Sao_Paulo');

module.exports = async (bot) => {
  if (!config.db()) {
    await waitingForDb();
  }

  const reminders = await Reminder.find({}).limit(5).sort('fireDate');
  Reminders.scheduleSavedReminders(bot, reminders);
};

const wait = (milliseconds) => new Promise((r) => setTimeout(r, milliseconds));

function waitingForDb() {
  return new Promise(async (resolve) => {
    while (!config.db()) {
      await wait(500);
    }
    resolve();
  });
}
