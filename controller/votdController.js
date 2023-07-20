import fetch from 'node-fetch';
import config from '../config.json' assert {type: "json"};
import { MessageEmbed } from 'discord.js';

/*
    Get VOTD from API.
*/
export async function getVotd() {
    try {
        const votdFetchURL = `${process.env.APIURL}/votd/get`;
        const votdResponse = await fetch(votdFetchURL);
        const votdData = await votdResponse.json();

        return votdData;
    } catch (error) {
        console.log(error);
        return;
    }
}

/*
    
*/
export async function compileVotdMessage(votdData) {
    try {
        const embed = new MessageEmbed()
            .setTitle(`[${votdData.date}] ${votdData.reference}`)
            .setURL(votdData.referenceLink)
            .setDescription(votdData.content)
            .setColor('#cbff7c')
            .setFooter(`Provided by ${votdData.credit}`)

        return embed;
    } catch (error) {
        console.log(error);
        return;
    }
}

/*
    Send Votd to channel
*/
export async function sendVotd(client) {
    try {
        const votdData = await getVotd();
        const embed = await compiletVotdMessage(votdData);

        const guild = await client.guilds.cache.get(config.discord.guildID);
        if (!guild) {
            console.log('Guild not found.');
            return;
        }

        const votdChannel = guild.channels.cache.get(config.discord.channel.votd);
        if (!votdChannel) {
            console.log('Channel not found.');
            return;
        }

        votdChannel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
        return;
    }
}