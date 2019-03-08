/* eslint-disable class-methods-use-this */
import { mails } from '../database/database';

class MailsController {
  createMail(req, res) {
    if (req.body.subject === undefined) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: subject cannot be undefined',
            sample: '{"subject": "string", "message": "string"}'
          }]
        });
    }
    if (req.body.subject === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: subject field cannot be empty',
            sample: '{"subject": "string", "message": "string"}'
          }]
        });
    }
    if (req.body.message === undefined) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: message cannot be undefined',
            sample: '{"subject": "string", "message": "string"}'
          }]
        });
    }
    if (req.body.message === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: message field cannot be empty',
            sample: '{"subject": "string", "message": "string"}'
          }]
        });
    }
    const mail = {
      id: 2,
      createdOn: Date(),
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: 1,
      status: 'sent'
    };

    if (mail) {
      mails.push(mail);
      res.status(200).json({
        status: 200,
        data: [{
          message: 'Success: Message sent successfully!',
          mails
        }]
      });
    } else {
      res.status(400).json({
        status: 400,
        data: [{
          message: 'Error: Message sending failed'
        }]
      });
    }
  }
  
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

  getMail(req, res) {
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
        data: [{
          message: 'Success: mail retrieved successfully!',
          msg
        }]
      });
    } else {
      res.status(404).json({
        success: 404,
        message: 'Error: mail not found'
      });
    }
  }

  deleteMail(req, res) {
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
          data: [{
            message: 'Success: mail deleted successfully!',
            mail
          }]
        });
      }
      if (msg.length === 0) {
        return res.status(404).json({
          status: 404,
          data: [{
            message: 'Error: mail not found'
          }]
        });
      }
    });
  }
}

const mailsController = new MailsController();
export default mailsController;
