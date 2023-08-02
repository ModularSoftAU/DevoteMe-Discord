import { Command, RegisterBehavior } from '@sapphire/framework';
import { getTimezones } from '../controller/common';

export class ConfigureCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Configure DevoteMe to apply changes to features.',
      chatInputCommand: {
        register: true,
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite
      },
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }


  async chatInputRun(interaction) {
    return interaction.reply(`Configure Panel`);
  }
}