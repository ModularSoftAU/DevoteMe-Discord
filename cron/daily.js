import cron from 'node-cron';
import { sendDevotion } from '../controller/devotionController';
import { sendVotd } from '../controller/votdController';

// 
// DAILY Cron Jobs [Firing at 7:00am]
// 
export default async function dailyCron(client) {
    const sendDevotionTask = cron.schedule('0 7 * * *', async function () {
        sendDevotion(client);
    }, {
        scheduled: true,
        timezone: process.env.TZ
    });

    sendDevotionTask.start();

    const sendVotdTask = cron.schedule('0 7 * * *', async function () {
        sendVotd(client)
    }, {
        scheduled: true,
        timezone: process.env.TZ
    });

    sendVotdTask.start();
}