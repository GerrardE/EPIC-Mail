import { users } from '../database/database';

// Regex Validations: stack overflow
class UserValidatorHandler {
  static signupValidator(req, res, next) {
    let {
      firstName, lastName, email, password
    } = req.body;
    
    // First name validation
    if (firstName === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'First name field cannot be empty'
        });
    }
    if (firstName === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'First name field cannot be empty',
        });
    }
    if (typeof firstName !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'First name must be a string',
        });
    }
    firstName = firstName.trim().replace(/\s\s+/g, ' ');
    if (firstName.length < 3 || firstName.length > 50) {
      return res.status(400)
        .send({
          status: 400,
          message: 'First name should be 4 to 50 aplhabets long',
        });
    }
    const validFirstNameCharacters = /^[a-zA-Z]+$/;
    if (!validFirstNameCharacters.test(firstName)) {
      return res.status(400)
        .send({
          status: 400,
          message: 'First name accepts only alphabets',
        });
    }

    // Last name validation
    if (lastName === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Last name field is required',
        });
    }
    if (lastName === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Last name field cannot be empty',
        });
    }
    if (typeof lastName !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Last name must be a string',
        });
    }
    lastName = lastName.trim().replace(/\s\s+/g, ' ');
    if (lastName.length < 3 || lastName.length > 50) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Last name should be 4 to 50 aplhabets long',
        });
    }
    const validlastNameCharacters = /^[a-zA-Z]+$/;
    if (!validlastNameCharacters.test(lastName)) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Last name accepts only alphabets',
        });
    }

    // Email Validation
    if (email === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field is required',
        });
    }
    if (email === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot be empty.'
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).send({
        status: 409,
        message: 'Error: email already exists!'
      });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 5 || email.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email should be 10 to 30 characters long'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password cannot contain spaces',
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password should be a string'
        });
    }
    password = password.trim();
    if (password.length < 5 || password.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email should be 10 to 30 characters long'
      });
    }

    next();
  }

  static loginValidator(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, password
    } = req.body;

    const foundUser = users.find(user => user.email === email);
    // Email Validation
    if (email === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    if (email === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email should be 10 to 30 characters long'
      });
    }
    if (!foundUser) {
      return res.status(400).send({
        status: 400,
        message: 'Error: authentication failed'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password cannot contain spaces'
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password should be a string'
        });
    }
    if (foundUser.password !== password) {
      return res.status(409).send({
        status: 409,
        message: 'Error: Incorrect login details'
      });
    }

    return next();
  }

  static loginCheck(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, password
    } = req.body;

    // Email Validation
    if (email === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    if (email === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 30) {
      return res.status(400).send({
        status: 400,
        message: 'Error: email should be 10 to 30 characters long'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password cannot contain spaces'
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: password should be a string'
        });
    }

    next();
  }
}

const { signupValidator, loginValidator, loginCheck } = UserValidatorHandler;

export { signupValidator, loginValidator, loginCheck };
