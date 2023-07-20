import fetch from 'node-fetch';
import config from '../config.json' assert {type: "json"};
import { MessageEmbed } from 'discord.js';

/*
    Get Devotion from API.
*/
export async function getDevotion() {
    try {
        const devotionFetchURL = `${process.env.APIURL}/devotion/get`;
        const devotionResponse = await fetch(devotionFetchURL);
        const devotionData = await devotionResponse.json();

        return devotionData;
    } catch (error) {
        console.log(error);
        return;
    }
}

/*
    
*/
export async function compileDevotionMessage(devotionData) {
    try {
        // Join the content array into a single string with paragraph breaks
        const contentString = devotionData.content.join('\n\n');

        const embed = new MessageEmbed()
            .setTitle(`[${devotionData.date}] ${devotionData.title} (${devotionData.reading})`)
            .setDescription(contentString)
            .setColor('#cbff7c')
            .addField('Bible In A Year Reading', devotionData.bibleInOneYear)
            .setFooter(`${devotionData.credit}`)
            
        return embed;
    } catch (error) {
        console.log(error);
        return;
    }
}

/*
    Send Devotion to channel
*/
export async function sendDevotion(client) {
    try {
        const devotionData = await getDevotion();
        const embed = await compileDevotionMessage(devotionData);

        const guild = await client.guilds.cache.get(config.discord.guildID);
        if (!guild) {
            console.log('Guild not found.');
            return;
        }

        const devotionChannel = guild.channels.cache.get(config.discord.channel.devotion);
        if (!devotionChannel) {
            console.log('Channel not found.');
            return;
        }

        devotionChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
        return;
    }
}