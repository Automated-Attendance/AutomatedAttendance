import MailGun from 'mailgun-js'
const mailgun = MailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
 
exports.sendMailLate = (req, res) => {
  req.params.forEach( (person)=> {
    var data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: person.email,
      subject: 'Late Email Warning',
      text: '1 minutes till class starts! Email communication@ if you are going to be late.'
    };
    
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        res.status(500).send(error);
        return;
        console.log(error);
      } else {
        console.log(body);
      }
    });
  });
};
  
exports.sendMailForArrival = async (matchedUsers) => {
  matchedUsers.forEach((user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'Class Arrival',
      text: 'Welcome to class! You have checked in today!'
    };
    mailgun.messages().send(data);
  });
};

exports.sendAbsentEmails = async (emails) => {
  emails.forEach((user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'Absent',
      text: 'Refactor all the things!'
    };
    mailgun.messages().send(data);
  });
} 

