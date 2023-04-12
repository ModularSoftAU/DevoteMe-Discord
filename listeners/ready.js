import { Listener } from '@sapphire/framework';
import { sendVotd } from '../controller/votdController';

export class ReadyListener extends Listener {
  run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`[CONSOLE] [DISCORD] Successfully logged in as ${username} (${id})`);

    sendVotd(client);
  }
}