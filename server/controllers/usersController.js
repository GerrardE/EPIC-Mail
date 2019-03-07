/* eslint-disable class-methods-use-this */
import { users } from '../database/database';

class UsersController {
  createUser(req, res) {
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: 0
    };

    // First name validation
    if (user.firstName === undefined) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'First name field cannot be undefined',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    if (typeof user.firstName !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'First name must be a string',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    if (user.firstName === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'First name field cannot be empty',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    const checkFirstName = req.body.firstName.trim().replace(/\s\s+/g, ' ');
    if (checkFirstName.length < 3 || checkFirstName.length > 50) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'First name should be 4 to 50 aplhabets long',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    const validFirstNameCharacters = /^[a-zA-Z]+$/;
    if (!validFirstNameCharacters.test(user.firstName)) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'First name accepts only alphabets',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }

    // Last name validation
    if (user.lastName === undefined) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Last name field cannot be undefined',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    if (typeof user.lastName !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Last name must be a string',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    if (user.lastName === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Last name field cannot be empty',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    const checkLastName = req.body.lastName.trim().replace(/\s\s+/g, ' ');
    if (checkLastName.length < 3 || checkLastName.length > 50) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Last name should be 4 to 50 aplhabets long',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }
    const validlastNameCharacters = /^[a-zA-Z]+$/;
    if (!validlastNameCharacters.test(user.lastName)) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Last name accepts only alphabets',
            sample: '{"firstName": "string", "lastName": "string", "email": "string", "password": "string"}'
          }]
        });
    }

    // Email Validation
    if (user.email === undefined) {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: email is undefined',
          }]
        });
    }
    if (typeof user.email !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: email should be a string'
          }]
        });
    }
    const checkUserEmail = user.email.toLowerCase().trim();
    if (checkUserEmail === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: email cannot be empty.'
          }]
        });
    }
    // Password Validation
    if (user.password === '') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: password field cannot be empty'
          }],
        });
    }
    if (typeof user.password !== 'string') {
      return res.status(400)
        .json({
          status: 400,
          data: [{
            message: 'Error: password should be a string'
          }]
        });
    }


    // Create account if no errors
    if (user) {
      users.push(user);
      res.status(201).json({
        status: 201,
        data: [{
          message: 'Success: User created successfully!',
          users,
          token: 'xyz'
        }]
      });
    } else {
      res.status(400).json({
        status: 400,
        data: [{
          message: 'Error: User not created, try again...'
        }]
      });
    }
  }
}

const usersController = new UsersController();
export default usersController;
