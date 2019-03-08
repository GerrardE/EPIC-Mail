/* eslint-disable class-methods-use-this */
import { mails } from '../database/database';

class MailsController {
  getMails(req, res) {
    const msgs = mails;
    if (msgs) {
      return res.status(200)
        .json({
          status: 200,
          data: [{
            message: 'Success: messages retrieved successfully!',
            mails
          }]
        });
    }
  }

  getUnreadMails(req, res) {
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
        data: [{
          message: 'Success: unread mails retrieved successfully!',
          msg
        }]
      });
    } else {
      res.status(404).json({
        success: 404,
        data: [{
          message: 'Error: you have read all your mails',
          msg
        }]
      });
    }
  }

  getSentMails(req, res) {
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
        data: [{
          message: 'Success: sent mails retrieved successfully!',
          msg
        }]
      });
    } else {
      res.status(404).json({
        success: 404,
        data: [{
          message: 'Error: you have not sent any mail',
          msg
        }]
      });
    }
  }
}

const mailsController = new MailsController();
export default mailsController;
