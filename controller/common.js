import moment from "moment-timezone";

/*
    Get all Timezones
*/
export async function getTimezones() {
    const allTimezones = moment.tz.names();

    return allTimezones;
}