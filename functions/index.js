var admin = require("firebase-admin");

var serviceAccount = require("./medi-alert-1ba95-firebase-adminsdk-7izgh-6c48bc332b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const messaging = admin.messaging();

const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");

exports.taskRunner = functions
.pubsub.schedule('* * * * *')
.onRun(async (context)=>{
    const now = admin.firestore.Timestamp.now();
    const query = db.collection('notifications').where('whenToNotify','<=',now).where('notificationSent','==',false);
    const jobs = await query.get();
    jobs.forEach(async (snap)=>{
        const data = snap.data();
        logger.log(data)
        const message = {
            notification: {
                title: "Time for your Medicine",
                body: `${data.Todo}: ${data.description}`
            },
            token: data.token,
        };
        await snap.ref.update({notificationSent: true});
        messaging.send(message).then((res)=>{
            logger.log('Notification Sent');
        })
        .catch((err)=>logger.log(err));
    })
});

