// Regex Validations: stack overflow

class MailValidatorHandler {
  static createMailValidator(req, res, next) {
    let {
      toEmail, subject, message
    } = req.body;

    // Email Validation
    if (toEmail === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    toEmail = toEmail.toLowerCase();
    if (typeof toEmail !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    if (toEmail === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (toEmail.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(toEmail)) {
      return res.status(400).send({
        status: 400,
        error: 'Error: email format is invalid'
      });
    }
    if (toEmail.length < 10 || toEmail.length > 30) {
      return res.status(400).send({
        status: 400,
        error: 'Error: email should be 10 to 30 characters long'
      });
    }


    if (subject === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: subject cannot be empty',

        });
    }
    if (subject.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    if (subject === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: subject field cannot be empty',

        });
    }
    subject = subject.trim();
    subject = subject.replace(/ {1,}/g," ");

    if (message === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: message cannot be empty',

        });
    }
    if (message === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: message field cannot be empty',

        });
    }
    message = message.replace(/ {1,}/g," ");

    next();
  }

  static validMail(req, res, next) {
    let {
      toEmail, subject, message
    } = req.body;

    if (toEmail === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    if (toEmail === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(toEmail)) {
      return res.status(400).send({
        status: 400,
        error: 'Error: email format is invalid'
      });
    }
    if (toEmail.length < 2 || toEmail.length > 100) {
      return res.status(400).send({
        status: 400,
        error: 'Error: email should be 2 to 100 characters long'
      });
    }
    toEmail = toEmail.toLowerCase();

    if (subject === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: subject field cannot be empty',

        });
    }

    if (subject === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: subject field cannot be empty',

        });
    }
    subject = subject.replace(/ {1,}/g," ");

    if (message === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: message field cannot be empty',

        });
    }
    if (message === ' ') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: message field cannot be empty',

        });
    }
    if (message === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: message field cannot be empty',

        });
    }
    message = message.replace(/ {1,}/g," ");

    next();
  }
}

export default MailValidatorHandler;
