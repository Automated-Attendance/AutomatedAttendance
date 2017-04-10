import twilio from 'twilio';

const accountSid = process.env.TWILLIO_APP_SID;
const authToken = process.env.TWILLIO_APP_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.twilioMessage = function (req, res) {
  client.messages.create({
    to: '5104568837',
    from: '16692226070',
    body: 'hey han'
  }, function (err, message) {
    if(err) {
      console.log('ERR',err)
      res.status(404).end();
    }else {
      res.status(200).send();
    }
  })
};