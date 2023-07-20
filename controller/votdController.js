import fetch from 'node-fetch';
import config from '../config.json' assert {type: "json"};
import { MessageEmbed } from 'discord.js';

/*
    Clears
*/
export async function sendVotd(client) {
    try {
        const votdFetchURL = `${process.env.APIURL}/votd/get`;
        const votdResponse = await fetch(votdFetchURL);
        const votdData = await votdResponse.json();

        const guild = await client.guilds.cache.get(config.discord.guildID);
        if (!guild) {
            console.log('Guild not found.');
            return;
        }

        const votdChannel = guild.channels.cache.get(config.discord.channel.votd);
        if (!votdChannel) {
            console.log('votd channel not found.');
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(`[${votdData.date}] ${votdData.reference}`)
            .setURL(votdData.referenceLink)
            .setDescription(votdData.content)
            .setColor('#cbff7c')
            .setFooter(`Provided by ${votdData.credit}`)
        votdChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
        return;
    }
}