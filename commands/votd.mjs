import { Command, RegisterBehavior } from '@sapphire/framework';
import { compileVotdMessage, getVotd } from '../controller/votdController';

export class VotdCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Display today\'s Verse of The Day.',
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
    const votdData = await getVotd();
    const embed = await compileVotdMessage(votdData);

    await interaction.reply({ embeds: [embed] });
  }
}