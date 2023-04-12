import { Command, RegisterBehavior } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class WebsiteCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'help',
      description: 'Help & Support information',
      chatInputCommand: {
        register: true,
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite
      }
    });
  }

  async chatInputRun(interaction) {
    const embed = new MessageEmbed()
      .setTitle(`Help`)
      .setDescription(`If you require help, you can visit our Documentation, or you can visit our Support discord if you require any assistance with the DevoteMe suite.`)

      interaction.reply({
        embeds: [embed],
        empheral: true
      });
  }
}