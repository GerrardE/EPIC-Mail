import { users } from '../database/database';

class UsersController {
  static createUser(req, res) {
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: 0
    };

    // Create account if no errors
    users.push(user);
    return res.status(201).json({
      status: 201,
      message: 'Success: User created successfully!',
      data: {
        token: 'xyz',
      }
    });
  }

  static userLogin(req, res) {
    // Successful Login
    return res.status(200).json({
      status: 200,
      message: 'Success: login successful!',
      data: {
        token: 'xyz',
      }
    });
  }
}

const { createUser, userLogin } = UsersController;
export { createUser, userLogin };
