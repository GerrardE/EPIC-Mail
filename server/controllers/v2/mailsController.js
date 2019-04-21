import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createMessage, userMessage, returnUser, getMessages, getUnread, getRead, getSentMessages,
  getMessage, deleteMessage, updateMessageStatus, retractMessage, retractUserMessage
} from '../../database/sqlQueries';

class MailsController {
  static createMail(req, res) {
    const decUser = req.decoded.userid;
    const senderId = Number(decUser);
    const decEmail = req.decoded.email;

    const {
      subject, message, toEmail, status
    } = req.body;

    const toMessage = [senderId, subject, message, toEmail, status, moment().format('llll')];

    pool.query(returnUser, [toEmail])
    // check if email exists
      .then((result) => {
        if (result.rowCount !== 0 && (result.rows[0].email !== decEmail)) {
          const { userid } = result.rows[0];
          return pool.query(createMessage, toMessage)
            .then((data) => {

              const newMessage = data.rows[0];

              return pool.query(userMessage, [userid, newMessage.id, status])
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
        if (result.rows[0].email) {
          return res.status(400).send({
            success: false,
            message: 'Error: Oops! looks like you tried to email yourself.'
          });
        }
        if (result.rowCount === 0) {
          return res.status(400).send({
            success: false,
            message: 'Error: email does not exist.'
          });
        }
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Error: email does not exist.'
      }))
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

  // Refactors get unread mails
  static getUnread(req, res) {
    const { email } = req.decoded;

    pool.query(getUnread, [email, 'sent'])
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
        return res.status(400)
          .send({
            success: false,
            message: 'Error: you have read all your messages'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: you have read all your messages'
        }));
  }

  static getRead(req, res) {
    const { email } = req.decoded;

    pool.query(getRead, [email, 'read'])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedMessages = data.rows;

          return res.status(200)
            .send({
              success: true,
              message: 'Success: read messages retrieved successfully!',
              retrievedMessages
            });
        }
        return res.status(400)
          .send({
            success: false,
            message: 'Error: you have not read any message'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: server not responding. Please try again.'
        }));
  }

  static updateStatus(req, res) {
    const { email } = req.decoded;
    let { id } = req.params;
    id = Number(id);
    const { status } = req.body;
    
    const values = [email, id, status];

    pool.query(updateMessageStatus, values)
      .then((data) => {
        if (data.rowCount > 0) {
          const editedMessage = data.rows;
          // user message query starts
          return res.status(200)
            .send({
              success: true,
              message: 'Success: message status updated successfully!',
              editedMessage
            });
        }
        // If the message was not found
        return res.status(500)
          .send({
            success: false,
            message: 'Error: message not found',
          });
      })// If the message status was not edited
      .catch(() => res.status(500)
        .send({
          success: false,
          message: 'Error: message status could not be edited. Try again'
        }));
  }

  static getSentMails(req, res) {
    const { userid } = req.decoded;
    
    pool.query(getSentMessages, [userid])

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
    const { userid } = req.decoded;
    const { id } = req.params;

    pool.query(getMessage, [userid, id])
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
    const { email } = req.decoded;
    let { id } = req.params;
    id = Number(id);

    pool.query(deleteMessage, [email, id, 'deleted'])
      .then((data) => {
        if (data.rowCount > 0) {
          return res.status(200).send({
            success: true,
            message: 'Success: mail deleted successfully!'
          });
        }
        // If the message was not found
        return res.status(400)
          .send({
            success: false,
            message: 'Error: mail not found',
          });
      })
      .catch(err => res.status(500)
        .send({ 
          success: false,
          message: 'Error: mail could not be deleted either because the mail was not found, or something bad happened. Please try again.'
        }));
  }

  static retractMail(req, res) {
    const { userid } = req.decoded;
    const { email } = req.body;
    let { id } = req.params;
    id = Number(id);

    // return the person email was sent to
    pool.query(returnUser, [email])
      .then((info) => {
        if (info.rowCount > 0) {
          const userId = info.rows[0].userid;
          // delete from userMessages
          return pool.query(retractMessage, [userid, id])
            .then((data) => {
              if (data.rowCount > 0) {
                // delete from messages
                return pool.query(retractUserMessage, [id, userId])
                  .then((result) => {
                    return res.status(200)
                      .send({
                        success: true,
                        message: 'Success: mail retracted successfully!'
                      });
                  })
                  .catch(err => res.status(400).send({
                    success: false,
                    message: 'Error: mail not found'
                  }));
              }
              return res.status(400)
                .send({
                  success: false,
                  message: 'Error: mail not deleted'
                });
            })
            .catch(err => res.status(500)
              .send({
                success: false,
                message: 'Error: server not responding. Please try again.'
              }));
        }
        return res.status(400).send({
          success: false,
          message: 'Error: problem retrieving email'
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Error: server not responding, Try again later'
      }));
  }
}

export default MailsController;
