const { TextChannel, MessageEmbed } = require('discord.js');
const { EventHandler } = require('sensum');

const listOfTodoEmotes = ['☑️', '✔️', '✅', '❤️', '👀'];

module.exports = new EventHandler({
  name: 'messageReactionAdd',
  run(bot, reaction) {
    // Trash bin
    if (reaction.message.channel.id === '888472757900288090') {
      reaction.message.delete().catch(console.log);
    }

    const redirect = bot.redirects.get(reaction.message.guildId)?.get(reaction.emoji.toString());
    if (redirect) {
      const channel = reaction.message.guild.channels.cache.get(redirect.channelId);
      if (!channel) {
        bot.emit('warn', `Could not find channel ${redirect.channelId}`);
        return;
      }
      const msg = reaction.message.content;
      const targetChannel = reaction.message.guild.channels.cache.get(redirect.channelId);
      if (targetChannel instanceof TextChannel) {
        targetChannel
          .send({
            embeds: [
              new MessageEmbed()
                .setTitle('Redirects')
                .setDescription(msg)
                .setColor(0x00ff00)
                .setFooter(
                  `From ${reaction.message.channel.name} by ${reaction.message.author.tag}`,
                  reaction.message.author.displayAvatarURL(),
                ),
            ],
          })
          .then(() => reaction.message.delete())
          .catch(console.log);
      }
    }
  },
});
