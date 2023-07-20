import fetch from 'node-fetch';
import config from '../config.json' assert {type: "json"};
import { MessageEmbed } from 'discord.js';

/*
    Get Devotion from API and send to channel.
*/
export async function sendDevotion(client) {
    try {
        const devotionFetchURL = `${process.env.APIURL}/devotion/get`;
        const devotionResponse = await fetch(devotionFetchURL);
        const devotionData = await devotionResponse.json();

        const guild = await client.guilds.cache.get(config.discord.guildID);
        if (!guild) {
            console.log('Guild not found.');
            return;
        }

        const devotionChannel = guild.channels.cache.get(config.discord.channel.devotion);
        if (!devotionChannel) {
            console.log('Devotion channel not found.');
            return;
        }

        // Join the content array into a single string with paragraph breaks
        const contentString = devotionData.content.join('\n\n');

        const embed = new MessageEmbed()
            .setTitle(`[${devotionData.date}] ${devotionData.title} (${devotionData.reading})`)
            .setDescription(contentString)
            .setColor('#cbff7c')
            .addField('Bible In A Year Reading', devotionData.bibleInOneYear)
            .setFooter(`${devotionData.credit}`)
        devotionChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
        return;
    }
}