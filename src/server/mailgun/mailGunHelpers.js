import MailGun from 'mailgun-js'
const mailgunAPI = MailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
 
exports.sendMailLate = (req, res) => {
  req.params.forEach( (person)=> {
    var data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: person.email,
      subject: 'Late Email Warning',
      text: '1 minutes till class starts! Email communication@ if you are going to be late.'
    };
    
    // mailgunAPI.messages().send(data, function (error, body) {
    //   if (error) {
    //     res.status(500).send(error);
    //     return;
    //     console.log(error);
    //   } else {
    //     console.log(body);
    //   }
    // });
  });
};
  
exports.sendMailForArrival = async (matchedUsers) => {
  console.log('sending email for arrival')
  matchedUsers.forEach((user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'Class Arrival',
      text: 'Welcome to class! You have checked in today!'
    };
    // mailgun.messages().send(data);
  });
};

exports.sendAbsentEmails = async (emails) => {
  console.log('sending absent emails')
  emails.forEach((user) => {
    console.log(user)
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'Absent',
      text: 'You are absent now'
    };
    // mailgun.messages().send(data);
  });
};

exports.sendWarningEmails = async (emails) => {
  console.log('sending warning emails')
  emails.forEach( (user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user[0].email,
      subject: 'Warning Email',
      text: 'Yo ass about to be late! 1 Minute from bell'
    };
    // mailgun.messages().send(data);
  });
};

exports.sendTardyEmails = async (users) => {
  console.log('sending tardy emails')
  users.forEach( (user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'Tardy',
      text: "It's 9AM you are still not in class,you will be if you get to class by 9:30"
    };
    // mailgun.messages().send(data);
  });
}