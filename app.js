import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import packageData from './package.json' assert {type: "json"};
import dotenv from 'dotenv';
dotenv.config()

// 
// Discord
// 
const client = new SapphireClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ],
    presence: {
        status: "online",
        activities: [{
            name: `config.siteConfiguration.siteAddress`,
            type: 'PLAYING'
        }]
    }
});

client.login(process.env.DISCORDAPIKEY);

console.log(`\n// ${packageData.name} v.${packageData.version}\nGitHub Repository: ${packageData.homepage}\nCreated By: ${packageData.author}`);
console.log(`Bot is listening.`);