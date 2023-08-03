import { Subcommand } from '@sapphire/plugin-subcommands';

// Extend `Subcommand` instead of `Command`
export class ConfigureCommand extends Subcommand {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'vip',
      subcommands: [
        {
          name: 'list',
          chatInputRun: 'chatInputList',
          default: true,
        },
        {
          name: 'setTimezone',
          chatInputRun: 'chatInputTimezone'
        },
        {
          name: 'votdChannel',
          chatInputRun: 'chatVotdChannel'
        },
        {
          name: 'devotionChannel',
          chatInputRun: 'chatDevotionChannel'
        },
        {
          name: 'prayerChannel',
          chatInputRun: 'chatPrayerChannel'
        }
      ]
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('vip')
        .setDescription('Configure options for guild') // Needed even though base command isn't displayed to end user
        .addSubcommand((command) => command.setName('list').setDescription('List configuration for guild.'))
        .addSubcommand((command) =>
          command
            .setName('setTimezone')
            .setDescription('Set the timezone for messages to be sent')
        )
        .addSubcommand((command) =>
          command
            .setName('votdChannel')
            .setDescription('Set the channel of where messages are to be sent')
            .addChannelOption((option) =>
              option.setName('user').setDescription('user to add to vip list').setRequired(true)
            )
        )
    );
  }

  async chatInputList(interaction) {
    interaction.reply(`List all configuration`)
  }

  async chatInputTimezone(interaction) {
    interaction.reply(`List all timezones to set`)
  }

  async chatInputRemove(interaction) { }
}