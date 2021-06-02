const { Task } = require('sensum');
const mongoose = require('mongoose');
const m = require('moment');

const Reminder = require('../models/reminder.model');
const config = require('../config');
const moment = (...args) => m(...args).tz('America/Sao_Paulo');

module.exports = async (bot) => {
  if (!config.db()) {
    await waitingForDb();
  }

  const reminders = await Reminder.find({}).limit(5).sort('fireDate');
  for (const reminder of reminders) {
    console.log('Scheduling', `Reminder-${reminder.userId}-${reminder._id}`);
    bot.schedule.create(
      bot,
      new Task({
        name: `Reminder-${reminder.userId}-${reminder._id}`,
        time: reminder.fireDate,
        async run(bot) {
          console.log('run: ', reminder.content);
          const channel = await bot.channels.fetch(reminder.channel);
          if (!channel) {
            // await dm();
          } else {
            await channel.send(
              bot.lines(
                `📆 **Reminder**`,
                reminder.content,
                `- You, ${moment(reminder.createdAt).calendar()}`,
              ),
            );
          }
          await reminder.delete();
        },
      }),
    );
  }
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
