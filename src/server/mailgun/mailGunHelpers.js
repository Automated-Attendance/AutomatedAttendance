import MailGun from 'mailgun-js'
const mailgunAPI = MailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
  
exports.sendMailForArrival = async (matchedUsers) => {
  matchedUsers.forEach(user => {
    let data = {
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You checked in!',
      text: 'Welcome to class! You\'ve checked in on time today! Get ready for another great day of hacking.'
    };
    mailgunAPI.messages().send(data);
  });
};

exports.sendAbsentEmails = async (emails) => {
  emails.forEach(user => {
    let data = {
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You did not check in!',
      text: 'You\'re late! Class has started. Please hurry. We miss you!'
    };
    mailgunAPI.messages().send(data);
  });
};

exports.sendWarningEmails = async (emails) => {
  emails.forEach(user => {
    let data = {
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user[0].email,
      subject: 'Check in reminder!',
      text: 'Time to hustle. You\'re about to be late! The gong sounds in 10 minutes.'
    };
    mailgunAPI.messages().send(data);
  });
};

exports.sendTardyEmails = async (users) => {
  users.forEach(user => {
    let data = {
      from: 'AA Support Team <no-reply@mail.automatedattendance.com>',
      to: user.email,
      subject: 'You checked in (late)!',
      text: "Welcome to class! You\'ve checked in late today. Get ready for another great day of hacking."
    };
    mailgunAPI.messages().send(data);
  });
}