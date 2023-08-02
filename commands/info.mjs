import { Command, RegisterBehavior } from '@sapphire/framework';

export class InfoCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Display the information for either your guild, or everyone using DevoteMe.',
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
    return interaction.reply(`Info Panel`);
  }
}