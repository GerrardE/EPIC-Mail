import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createMessage, userMessage, returnUser, getMessages, getUnreadMessages, getSentMessages, getMessage, deleteMessage
} from '../../database/sqlQueries';

class MailsController {
  static createMail(req, res) { 
    const decUser = req.decoded.payload;
    const senderId = +decUser.userid;

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

              return pool.query(userMessage, [userid, newMessage.id, false])
                .then(() => res.status(201)
                  .send({
                    success: true,
                    message: 'Message sent successfully!',
                    newMessage
                  })).catch(err => res.status(400)
                  .send({
                    success: false,
                    error: err.message
                  }));
            })
            .catch(err => res.status(500).send({
              success: false,
              message: err.message
            }));
        }
      })
      .catch(err => res.status(500).send({
        success: false,
        message: err.message
      }));
  }

  static getMails(req, res) {
    const { userId } = req.decoded.payload;

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
          message: err.message
        }));
  }

  static getUnreadMails(req, res) {
    const { userId } = req.decoded.payload;

    pool.query(getUnreadMessages, [userId, false])
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
          message: err.message
        }));
  }

  static getSentMails(req, res) {
    const { userId } = req.decoded.payload;

    pool.query(getSentMessages, [userId, true])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;
          return res.status(201)
            .send({
              success: true,
              message: 'Sent messages retrieved successfully!',
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
          message: err.message
        }));
  }

  static getMail(req, res) {
    const { userId } = req.decoded.payload;
    const { id } = req.params;
 
    pool.query(getMessage, [userId, id])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessage = data.rows;
          return res.status(201)
            .send({
              success: true,
              message: 'Message retrieved successfully!',
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
          message: err.message
        }));
  }

  static deleteMail(req, res) {
    const { userid } = req.decoded.payload;
    const { id } = req.params;

    pool.query(deleteMessage, [userid, id])
      .then((data) => {
        if (res.rowCount !== 0) {
          const deletedMessage = data.rows[0];
          return res.status(201)
            .send({
              success: true,
              message: 'Message deleted successfully!',
              deletedMessage
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Something happened. Try again'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: err.message
        }));
  }
}

export default MailsController;
