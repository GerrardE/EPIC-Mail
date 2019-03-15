import { mails, users, people } from '../database/database';

class MailsController {
  static createMail(req, res) {
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

    const foundUser = users.find(user => user.email === mail.toEmail);
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        message: 'Error: email does not exist'
      });
    }

    if (mail) {
      mails.push(mail);
      res.status(200).json({
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
    const msgs = mails;
    if (msgs.length > 0) {
      return res.status(200)
        .json({
          status: 200,
          message: 'Success: messages retrieved successfully!',
          mails
        });
    }
  }

  static getUserMails(req, res) {
    const decUser = req.decoded.payload;
    const msgs = people.filter(person => +decUser.id === person.id);

    if (msgs.length > 0) {
      return res.status(200)
        .json({
          status: 200,
          message: 'Success: messages retrieved successfully!',
          mails
        });
    }
  }

  static getUnreadMails(req, res) {
    const msg = [];
    const value = 'unread';
    mails.map((mail) => {
      if (mail.status === value) {
        msg.push(mail);
      }
    });
    if (msg.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: unread mails retrieved successfully!',
        msg
      });
    } else {
      return res.status(404).json({
        success: 404,
        message: 'Error: you have read all your mails',
      });
    }
  }

  static getUserUnreadMails(req, res) {
    const decUser = req.decoded.payload;
    const msgs = people.filter(person => +decUser.id === person.id);
    const mail = msgs.filter(msg => msg.id === 'unread');

    if (mail.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: unread mails retrieved successfully!',
        mail
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: you have read all your mails',
    });
  }

  static getSentMails(req, res) {
    const msg = [];
    const value = 'sent';
    mails.map((mail) => {
      if (mail.status === value) {
        msg.push(mail);
      }
    });
    if (msg.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: sent mails retrieved successfully!',
        msg
      });
    } else {
      res.status(404).json({
        success: 404,
        message: 'Error: you have not sent any mail',
        msg
      });
    }
  }

  static getUserSentMails(req, res) {
    const decUser = req.decoded.payload;
    const msgs = users.filter(user => +decUser.id === user.id);
    const mail = msgs.filter(msg => msg.status === 'sent');

    if (mail.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: sent mails retrieved successfully!',
        mail
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: you have not sent any mail',
    });
  }

  static getMail(req, res) {
    const msg = [];
    const id = parseInt(req.params.id, 10);
    mails.map((mail) => {
      if (mail.id === id) {
        msg.push(mail);
      }
    });
    if (msg.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: mail retrieved successfully!',
        msg
      });
    } else {
      res.status(404).json({
        success: 404,
        message: 'Error: mail not found'
      });
    }
  }

  static getUserMail(req, res) {
    const decUser = req.decoded.payload;
    const msgs = people.filter(person => +decUser.id === person.id);
    const mail = msgs.filter(msg => msg.id === +req.params.id);

    if (mail.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'Success: mail retrieved successfully!',
        mail
      });
    }

    return res.status(404).json({
      success: 404,
      message: 'Error: mail not found'
    });
  }

  static deleteMail(req, res) {
    const decUser = req.decoded.payload;
    const msgs = people.filter(person => +decUser.id === person.id);
    const mail = msgs.filter(msg => msg.id === +req.params.id);

    if (mail.length > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Success: mail deleted successfully!',
        mail
      });
    }
    if (mail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Error: mail not found'
      });
    }
  }
}

export default MailsController;
