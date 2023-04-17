import { Listener } from '@sapphire/framework';
import { sendDevotion } from '../controller/devotionController';

export class ReadyListener extends Listener {
  run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`[CONSOLE] [DISCORD] Successfully logged in as ${username} (${id})`);
  }
}