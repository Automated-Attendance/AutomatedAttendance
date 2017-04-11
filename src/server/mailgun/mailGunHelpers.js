import MailGun from 'mailgun-js'
const mailgun = MailGun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
 
exports.sendMail = (req, res) => {
  req.params.forEach( (person)=> {
    var data = { 
      from: 'Excited User <aaallstars15@gmail.com>',
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
    })
  });
};
  


