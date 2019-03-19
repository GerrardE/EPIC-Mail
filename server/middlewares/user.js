import { users } from '../database/database';

class UserValidatorHandler {
  static signupValidator(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      firstName, lastName, email, password
    } = req.body;
    // First name validation
    if (firstName === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'First name field cannot be empty',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    if (firstName === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'First name field cannot be empty',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    if (typeof firstName !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'First name must be a string',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    firstName = firstName.trim().replace(/\s\s+/g, ' ');
    if (firstName.length < 3 || firstName.length > 50) {
      return res.status(400)
        .json({
          status: 400,
          message: 'First name should be 4 to 50 aplhabets long',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    const validFirstNameCharacters = /^[a-zA-Z]+$/;
    if (!validFirstNameCharacters.test(firstName)) {
      return res.status(400)
        .json({
          status: 400,
          message: 'First name accepts only alphabets',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }

    // Last name validation
    if (lastName === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Last name field is required',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    if (lastName === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Last name field cannot be empty',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    if (typeof lastName !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Last name must be a string',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    lastName = lastName.trim().replace(/\s\s+/g, ' ');
    if (lastName.length < 3 || lastName.length > 50) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Last name should be 4 to 50 aplhabets long',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }
    const validlastNameCharacters = /^[a-zA-Z]+$/;
    if (!validlastNameCharacters.test(lastName)) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Last name accepts only alphabets',
          sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
        });
    }

    // Email Validation
    if (email === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field is required',
        });
    }
    if (email === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email cannot be empty.'
        });
    }
    if (email.includes(' ')) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email cannot include space.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email should be a string'
        });
    }
    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).json({
        status: 409,
        error: 'Error: email already exists!'
      });
    }
    // email check: stackoverflow
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailCheck.test(email)) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 5 || email.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email should be 10 to 30 characters long'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password cannot contain spaces',
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password should be a string'
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
        .json({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    if (email === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email should be a string'
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
        error: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email should be 10 to 30 characters long'
      });
    }
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        message: 'Error: authentication failed'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password cannot contain spaces'
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password should be a string'
        });
    }
    if (foundUser.password !== password) {
      return res.status(409).json({
        status: 409,
        error: 'Error: Incorrect login details'
      });
    }

    req.body.foundUser = foundUser;
    req.body.password = password;
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
        .json({
          status: 400,
          message: 'Error: email field cannot be empty',
        });
    }
    if (email === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email field cannot be empty.'
        });
    }
    if (typeof email !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: email should be a string'
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
        error: 'Error: email format is invalid'
      });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 30) {
      return res.status(400).json({
        status: 400,
        error: 'Error: email should be 10 to 30 characters long'
      });
    }

    // Password Validation
    if (password === undefined) {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password field cannot be empty'
        });
    }
    if (password === ' ') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password cannot contain spaces'
        });
    }
    if (typeof password !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          message: 'Error: password should be a string'
        });
    }

    next();
  }
}

const { signupValidator, loginValidator, loginCheck } = UserValidatorHandler;

export { signupValidator, loginValidator, loginCheck };
