import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createMessage, userMessage, returnUser, getMessages, getUnreadMessages, getSentMessages, getMessage, deleteMessage
} from '../../database/sqlQueries';

class MailsController {
  static createMail(req, res) { 
    const decUser = req.decoded.userid;
    const senderId = Number(decUser);

    let {
      subject, message, toEmail
    } = req.body;

    const toMessage = [senderId, subject, message, toEmail, moment().format('llll')];

    pool.query(returnUser, [toEmail])
    // check if email exists
      .then((result) => {
        if (result.rowCount !== 0) {
          const { userid } = result.rows[0];
          return pool.query(createMessage, toMessage)
            .then((data) => {
              const newMessage = data.rows[0];

              return pool.query(userMessage, [userid, newMessage.id, 'unread'])
                .then(() => res.status(201)
                  .send({
                    success: true,
                    message: 'Message sent successfully!',
                    newMessage
                  })).catch(err => res.status(400)
                  .send({
                    success: false,
                    error: 'Message sending failed.'
                  }));
            })
            .catch(err => res.status(500).send({
              success: false,
              message: 'Message sending failed.'
            }));
        }
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Message sending failed.'
      }));
  }

  static getMails(req, res) {
    const { userId } = req.decoded;

    pool.query(getMessages, [userId])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Messages retrieved successfully!',
              retrievedMessages
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'No message found',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'No message found'
        }));
  }

  static getUnreadMails(req, res) {
    const { userId } = req.decoded;

    pool.query(getUnreadMessages, [userId, 'unread'])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;

          return res.status(201)
            .send({
              success: true,
              message: 'Unread messages retrieved successfully!',
              retrievedMessages
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'You have read all your messages',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'You have read all your messages'
        }));
  }

  static getSentMails(req, res) {
    const { userId } = req.decoded;
    pool.query(getSentMessages, [userId, false])

      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Success: sent mails retrieved successfully!',
              retrievedMessages
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'You have not sent any message',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'You have not sent any message'
        }));
  }

  static getMail(req, res) {
    const { userId } = req.decoded;
    const { id } = req.params;
 
    pool.query(getMessage, [userId, id])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessage = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Success: mail retrieved successfully!',
              retrievedMessage
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'No message found',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'No message found'
        }));
  }

  static deleteMail(req, res) {
    const { userid } = req.decoded;
    const { id } = req.params;

    pool.query(deleteMessage, [userid, id])
      .then((data) => {
        if (data.rowCount !== 0) {
          const deletedMessage = data.rows[0];
          return res.status(200)
            .send({
              success: true,
              message: 'Success: mail deleted successfully!',
              deletedMessage
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Error: mail not found'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: mail not found'
        }));
  }
}

export default MailsController;
