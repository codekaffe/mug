const { Command, Permission, TextHelpers } = require('sensum');
const { codeBlock } = require('@discordjs/builders');
const { Collection, MessageEmbed } = require('discord.js');

const Redirect = require('../../models/redirect.model');

module.exports = new Command({
  name: 'redirect',
  description: 'Manages message redirects',
  usage: '<add|remove|list> <channel>',
  examples: ['add #general', 'remove #general', 'list'],
  aliases: ['redirects'],
  category: 'organization',
  permission: Permission.MANAGE_ROLES,
  args: {
    action: {
      type: 'enum',
      values: ['add', 'remove', 'list'],
      optional: false,
      default: 'list',
    },
    channel: {
      type: 'string',
      optional: true,
    },
  },
  async run(bot, message, context) {
    // Create a reaction collector

    if (context.args.action === 'add') {
      if (!context.args.channel) {
        return message.reply('You must specify a channel to redirect to.');
      }
      const promptMessage = await message.channel.send(
        'Please react to this message with the emoji you want to use for the redirect.',
      );
      const collector = promptMessage.createReactionCollector({
        filter: (reaction, user) => user.id === message.author.id,
        time: 15_000,
        max: 1,
        maxEmojis: 1,
      });

      collector.on('collect', (r) => {
        console.log(`Collected ${r.emoji.name}`);
      });
      collector.on('end', async (collected) => {
        console.log(`Collected ${collected.size} items`);
        const selectedEmoji = collected.first()?.emoji;
        if (!selectedEmoji) {
          await message.channel.send('You did not react in time.');
          return;
        }
        const redirect = new Redirect({
          guildId: message.guild.id,
          channelId: context.args.channel.substring(2, context.args.channel.length - 1),
          emoji: selectedEmoji.toString(),
          userId: message.author.id,
        });
        await redirect.save();
        if (!bot.redirects.has(redirect.guildId)) {
          bot.redirects.set(redirect.guildId, new Collection());
        }
        bot.redirects.get(redirect.guildId).set(selectedEmoji.toString(), redirect);
        const successMessage = await message.channel.send(
          TextHelpers.lines(
            `Channel selected: ${context.args.channel}`,
            `Emoji selected: ${selectedEmoji.toString()}`,
          ),
        );
        console.log('context.args.channel: ', context.args.channel);
        await successMessage.react(selectedEmoji).catch(() => {});
      });
    }

    if (context.args.action === 'list') {
      const redirects = await Redirect.find({ guildId: message.guild.id });
      await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('Redirects')
            .setDescription(
              redirects.length
                ? TextHelpers.lines(...redirects.map((r) => `${r.emoji} <#${r.channelId}>`))
                : 'None yet...',
            )
            .setColor(0x00ff00)
            .setFooter(message.author.tag, message.author.displayAvatarURL()),
          // .setAuthor(message.author.tag, message.author.displayAvatarURL()),
        ],
      });
    }
  },
});
