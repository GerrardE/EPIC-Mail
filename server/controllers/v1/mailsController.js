import { mails, users } from '../../database/database';

class MailsController {
  static createMail(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);

    const mail = {
      id: mails.length + 1,
      createdOn: Date(),
      toEmail: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      senderId: parseInt(req.params.id, 10),
      parentMessageId: 1,
      status: 'sent'
    };

    if (!person) {
      return res.status(400).json({
        status: 400,
        message: 'Error: email does not exist'
      });
    }

    if (person && mail) {
      mails.push(mail);
      return res.status(200).json({
        status: 200,
        message: 'Success: Message sent successfully!',
        mail
      });
    }

    return res.status(400).json({
      status: 400,
      message: 'Error: Message sending failed'
    });
  }

  static getMails(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);

    if (person) {
      return res.status(200)
        .json({
          status: 200,
          message: 'Success: messages retrieved successfully!',
          mails
        });
    }
  }

  static getUnreadMails(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);

    if (person) {
      return res.status(200).json({
        status: 200,
        message: 'Success: unread mails retrieved successfully!',
        messages: mails.find(mail => mail.status === 'unread')
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: you have read all your mails',
    });
  }

  static getSentMails(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);

    if (person) {
     return res.status(200).json({
        status: 200,
        message: 'Success: sent mails retrieved successfully!',
        messages: mails.find(mail => mail.status === 'sent')
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: you have not sent any mail',
    });
  }

  static getMail(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);
    const id = +req.params.id;

    if (person) {
      return res.status(200).json({
        status: 200,
        message: 'Success: mail retrieved successfully!',
        messages: mails.find(mail => mail.id === id)
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: mail not found'
    });
  }

  static deleteMail(req, res) {
    const decUser = req.decoded.payload;
    const person = users.find(user => decUser.email === user.email);
    const id = +req.params.id;
    const mail = mails.find(msg => msg.id === id)
    mail.splice(mail.id - 1, 1);

    if (person) {
      return res.status(200).json({
        status: 200,
        message: 'Success: mail deleted successfully!',
        mail
      });
    }
    if (!person) {
      return res.status(404).json({
        status: 404,
        message: 'Error: mail not found'
      });
    }
  }
}

export default MailsController;
