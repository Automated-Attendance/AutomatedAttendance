import MailGun from 'mailgun-js'
const mailgunAPI = MailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
  
exports.sendMailForArrival = async (matchedUsers) => {
  console.log('sending email for arrival');
  matchedUsers.forEach((user) => {
    console.log(user);
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You checked in!',
      text: 'Welcome to class! You have checked in on time today!'
    };
    // mailgunAPI.messages().send(data);
  });
};

exports.sendAbsentEmails = async (emails) => {
  console.log('sending absent emails')
  emails.forEach((user) => {
    console.log(user)
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You did not check in!',
      text: 'Where are you? You have been marked absent today.'
    };
    // mailgunAPI.messages().send(data);
  });
};

exports.sendWarningEmails = async (emails) => {
  console.log('sending warning emails')
  emails.forEach( (user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user[0].email,
      subject: 'Check in reminder!',
      text: 'You\'re about to be late! The gong sounds in 10 minutes.'
    };
    // mailgunAPI.messages().send(data);
  });
};

exports.sendTardyEmails = async (users) => {
  console.log('sending tardy emails')
  users.forEach( (user) => {
    let data = { 
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You checked in late!',
      text: "Welcome to class! You have checked in late today."
    };
    // mailgunAPI.messages().send(data);
  });
}