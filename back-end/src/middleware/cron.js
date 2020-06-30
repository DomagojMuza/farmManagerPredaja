const CronJob = require('cron').CronJob;
const Activity = require('../db/models/activity.js')
const mail = require('../email/mail')
//00 00 04 * * *
var job = new CronJob('00 00 04 * * *', async function() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    console.log("tomorow", tomorrow.getDate());
    const allActivities = await Activity.find({
        reminder: true,
        $and: [
            {scheduledAt: {$gt: today}},
            {scheduledAt: {$lte: tomorrow}}
        ]
    })
    let groupedByOwner = allActivities.reduce((grupirano, {ownerEmail, description}) =>{
        (grupirano[ownerEmail] = (grupirano[ownerEmail] || ["In the next 24h"])).push( description)
        return grupirano
    }, {})
    console.log(groupedByOwner);
    Object.keys(groupedByOwner).forEach(async (owner) =>{
        await mail.upcomingActivities(owner, groupedByOwner[owner])
        console.log(owner, groupedByOwner[owner]);
    })
});

job.start();