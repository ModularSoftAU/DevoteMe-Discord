import cron from 'node-cron';
import { sendDevotion } from '../controller/devotionController';

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
}