const express = require('express');
const cors = require('cors');
const https = require('https');
  
// CORS is enabled for the selected origins
let corsOptions = {
    origin: '*'
};
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
var admin = require("firebase-admin");

var serviceAccount = require("./medialert-15dab-firebase-adminsdk-eu2dl-8383dbb495.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var token;
const db = admin.firestore();
const app = express();
app.use(bodyParser.json())
app.use(cors(corsOptions)) 
const publicVapidKey = 'BAe2fMgBXyXkCebzlWFO8tFMuCTwvxV0R_fmiETLl2o-atBquisZFdhPuEUUUojThSot9U7LEJZZpya0sEUkf_8';
const privateVapidKey = 'LgQWe6EpNOX71BTwWb0moSy3-83DePoo9Fpy8AvMAS4';
webpush.setVapidDetails('mailto:chsairahul62@gmail.com', publicVapidKey,privateVapidKey);


const run = async ()=>{
    var query = db.collection('notifications').where('whenToNotify','<=',admin.firestore.Timestamp.now())
    .where('notificationSent','==',false);
    data = await query.get();
    data.forEach(async snapshot => {
        sendNotification(snapshot.data().Todo,snapshot.data().description);
        await db.doc('notifications/' + snapshot.id).update({
            "notificationSent": true,
        });
        console.log('Notification Sent')
    });
}
const sendNotification = async (title,body)=>{
    const payload = JSON.stringify({title: title,body : body});
    if(token) webpush.sendNotification(token, payload).catch(err=> console.error(err));
}
setInterval(run,1000);

app.post('/subscribe',(req,res)=>{
    const subscription = req.body;
    res.status(201).json({});
    token = subscription;
    console.log(token)
})

app.use(express.static('./Client/build'));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, './Client', 'build', 'index.html'));
});
const PORT = 443;
console.log('server started on port:',PORT);
app.listen(PORT,()=>{
    console.log('Server started at http://localhost:443')
});