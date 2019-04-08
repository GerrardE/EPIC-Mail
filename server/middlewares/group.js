// Regex Validations: stack overflow

class GroupValidatorHandler {
  static validGroupName(req, res, next) {
    let {
      name
    } = req.body;

    if (name === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name field cannot be empty',       
        });
    }
    if (name === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name field cannot be empty',
            
        });
    }
    if (name.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name cannot include space.'
        });
    }
    name = name.trim().toString();
    if (name.length < 2) {
      return res.status(400).send({
        status: 400,
        message: 'Error: name should be over 2 characters long'
      });
    }

    next();
  }

  static validMember(req, res, next) {
    let {
      email
    } = req.body;

    // Email Validation
    if (email === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    email = email.toLowerCase();
    if (typeof email !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    if (email === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).json({
        status: 400,
        message: 'Error: email format is invalid'
      });
    }
    if (email.length < 12) {
      return res.status(400).json({
        status: 400,
        message: 'Error: email should be at least 12 characters long'
      });
    }

    next();
  }
}

export default GroupValidatorHandler;
