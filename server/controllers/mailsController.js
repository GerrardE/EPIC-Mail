import { mails } from '../database/database';

class MailsController {
  static createMail(req, res) {
    const mail = {
      id: 2,
      createdOn: Date(),
      toEmail: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: 1,
      status: 'sent'
    };

    if (mail) {
      mails.push(mail);
      res.status(200).json({
        status: 200,
        message: 'Success: Message sent successfully!',
        mail
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Error: Message sending failed'
      });
    }
  }

  static getMails(req, res) {
    const msgs = mails;
    if (msgs) {
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

  static deleteMail(req, res) {
    const id = parseInt(req.params.id, 10);
    let msg = [];
    mails.find((mail, index) => {
      if (mail.id === id) {
        msg.push(mail);
        mails.splice(index, 1);
      } else {
        msg = [];
      }
      if (msg.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Success: mail deleted successfully!',
          msg
        });
      }
      if (msg.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Error: mail not found'
        });
      }
    });
  }
}

const {
  createMail, getMails, getUnreadMails, getSentMails, getMail, deleteMail
} = MailsController;

export {
  createMail, getMails, getUnreadMails, getSentMails, getMail, deleteMail
};
