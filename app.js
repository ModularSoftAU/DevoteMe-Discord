import { SapphireClient } from '@sapphire/framework';
import packageData from './package.json' assert {type: "json"};

import dotenv from 'dotenv';
import dailyCron from './cron/daily.js';
dotenv.config();

// 
// Discord
// 
const client = new SapphireClient({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS',
    ],
    presence: {
        status: "online",
        activities: [{
            name: 'https://modularsoft.org/docs/products/devoteMe/',
            type: 'PLAYING'
        }]
    }
});

//
// Cron Jobs
//
import('./cron/daily.js');
dailyCron(client);

client.login(process.env.DISCORDAPIKEY);

console.log(`\n// ${packageData.name} v.${packageData.version}\nGitHub Repository: ${packageData.homepage}\nCreated By: ${packageData.author}`);
console.log(`Bot is listening.`);