import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createMessage, userMessage, returnUser, getMessages, getUnreadMessages, getSentMessages, getMessage, deleteMessage
} from '../../database/sqlQueries';

class MailsController {
  static createMail(req, res) {
    const decUser = req.decoded.userid;
    const senderId = Number(decUser);

    const {
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
                .then(() => res.status(200)
                  .send({
                    success: true,
                    message: 'Success: message sent successfully!',
                    newMessage
                  })).catch(err => res.status(400)
                  .send({
                    success: false,
                    error: 'Error: message sending failed.'
                  }));
            })
            .catch(err => res.status(500).send({
              success: false,
              message: 'Error: message sending failed.'
            }));
        }
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Error: email does not exist.'
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
              message: 'Success: messages retrieved successfully!',
              retrievedMessages
            });
        }
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: no message found'
        }));
  }

  static getUnreadMails(req, res) {
    const { userId } = req.decoded;

    pool.query(getUnreadMessages, [userId, 'unread'])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;

          return res.status(200)
            .send({
              success: true,
              message: 'Success: unread messages retrieved successfully!',
              retrievedMessages
            });
        }
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: you have read all your messages'
        }));
  }

  static getSentMails(req, res) {
    const { userId } = req.decoded;
    pool.query(getSentMessages, [userId, 'sent'])

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
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: you have not sent any message'
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
        return res.status(400)
          .send({
            success: false,
            message: 'Error: mail not found.'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: server not responding. Please try again.'
        }));
  }

  static deleteMail(req, res) {
    const { userid } = req.decoded;
    let { id } = req.params;
    id = Number(id);

    pool.query(deleteMessage, [userid, id])
      .then((data) => {

        if (data.rowCount > 0) {
          const deletedMessage = data.rows[0];
          return res.status(200)
            .send({
              success: true,
              message: 'Success: mail deleted successfully!',
              deletedMessage
            });
        }
        return res.status(400)
          .send({
            success: true,
            message: 'Error: mail not found'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: server not responding. Please try again.'
        }));
  }
}

export default MailsController;
