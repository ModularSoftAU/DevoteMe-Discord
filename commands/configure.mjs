import { Command, RegisterBehavior } from '@sapphire/framework';

export class ConfigureCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Configure to apply changes to features.',
      chatInputCommand: {
        register: true,
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite
      },
    });

    // Define subcommands
    this.subcommands = [
      {
        name: 'timezone',
        description: 'Configure the timezone.',
      },
      {
        name: 'channel',
        description: 'Configure the channel id for specific features to send to.',
      },
      // Add more subcommands here if needed
    ];
  }

  registerApplicationCommands(registry) {
    // Register main command
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
    );

    // Register subcommands
    for (const subcommand of this.subcommands) {
      registry.registerChatInputCommand((builder) =>
        builder
          .setName(subcommand.name)
          .setDescription(subcommand.description)
      );
    }
  }

  async chatInputRun(interaction) {
    interaction.reply(`Use /${this.name} help for available subcommands.`);
  }

  async timezoneSubcommand(interaction) {
    interaction.reply(`Configure timezone logic`);
  }

  // Implement methods for other subcommands here if needed
}
