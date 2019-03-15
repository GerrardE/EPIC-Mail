import auth from '../helpers/auth';
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
    const token = auth.makeToken(user);
    return res.status(201).json({
      status: 201,
      message: 'Success: User created successfully!',
      data: { token }
    });
  }

  static userLogin(req, res) {
    const { foundUser } = req.body;
    const token = auth.makeToken(foundUser);
    // Successful Login
    return res.status(200).json({
      status: 200,
      message: 'Success: login successful!',
      data: { token }
    });
  }
}

export default UsersController;
