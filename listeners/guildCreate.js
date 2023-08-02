import { Listener } from '@sapphire/framework';
import fetch from 'node-fetch';

export class GuildCreateListener extends Listener {
  async run(guild) {
    this.container.logger.info(`Joined guild: ${guild.name} (${guild.id})`);

    const reqBody = {
      "guildId": guild.id
    }

    const response = await fetch(`${process.env.APIURL}/client/create`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': process.env.APIKEY
      }
    });
    const data = await response.json();
    console.log(data);
  }
}
