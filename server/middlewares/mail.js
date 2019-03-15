import { users } from '../database/database';

class MailValidatorHandler {
  static createMailValidator(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      toEmail, subject, message
    } = req.body;
    
    // Email Validation
    if (toEmail === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    toEmail = toEmail.toLowerCase().trim();
    if (typeof toEmail !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    if (toEmail === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (toEmail.includes(' ')) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(toEmail)) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email format is invalid'
      });
    }
    if (toEmail.length < 10 || toEmail.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email should be 10 to 30 characters long'
      });
    }

    if (subject === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: subject cannot be undefined',
          sample: '{"subject": "string", "message": "string"}'
        });
    }
    if (subject === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: subject field cannot be empty',
          sample: '{"subject": "string", "message": "string"}'
        });
    }
    if (message === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: message cannot be undefined',
          sample: '{"subject": "string", "message": "string"}'
        });
    }
    if (message === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: message field cannot be empty',
          sample: '{"subject": "string", "message": "string"}'
        });
    }

    next();
  }
}

const { createMailValidator } = MailValidatorHandler;

export default createMailValidator;
