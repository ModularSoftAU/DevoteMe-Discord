import { Command, RegisterBehavior } from '@sapphire/framework';
import { compileDevotionMessage, getDevotion } from '../controller/devotionController';

export class DevotionCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Display today\'s Devotion.',
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
    const devotionData = await getDevotion();
    const embed = await compileDevotionMessage(devotionData);

    return interaction.reply({ embeds: [embed] });
  }
}