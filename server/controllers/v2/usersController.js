import bcrypt from 'bcrypt';
import auth from '../../helpers/auth';
import pool from '../../database/dbconnect';
import { createUser, emailLogin } from '../../database/sqlQueries';

class UsersController {
  static createUser(req, res) {
    let email = req.body.email;
    email = email.split('@')[0];
    email = `${email}${'@epic-mail.com'}`;

    const values = [
      req.body.firstName,
      req.body.lastName,
      email,
      bcrypt.hashSync(req.body.password, 10)
    ];

    pool.query(createUser, values)
      .then((data) => {
        const newUser = data.rows[0];
        const userEmail = newUser.email;
        const token = auth.makeToken(newUser);
        return res.status(201)
          .send({
            message: 'Success: User created successfully!',
            data: `Welcome to EPIC-Mail. Your new email is ${userEmail}`,
            token
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Your account creation failed. Try again.'
        }));
  }

  static userLogin(req, res) {
    const value = [req.body.email];

    pool.query(emailLogin, value)
      .then((result) => {
        if (result.rowCount !== 0) {
          const checkPassword = bcrypt.compareSync(req.body.password, result.rows[0].password);
          if (checkPassword) {
            const user = result.rows[0];
            const token = auth.makeToken(user);
            return res.status(200)
              .send({
                success: true,
                message: 'Success: login successful!',
                token
              });
          }
          return res.status(401)
            .send({
              success: false,
              message: 'Authentication failed. Try again',
            });
        }
        if (result.rowCount === 0) {
          return res.status(404)
            .send({
              status: false,
              message: 'Error: Invalid credentials',
            });
        }
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: authentication failed',
        }));
  }
}

export default UsersController;
