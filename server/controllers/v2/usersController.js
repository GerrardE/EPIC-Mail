import bcrypt from 'bcrypt';
import auth from '../../helpers/auth';
import pool from '../../database/dbconnect';
import { createUser, emailLogin } from '../../database/sqlQueries';

class UsersController {
  static createUser(req, res) {
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      bcrypt.hashSync(req.body.password, 10)
    ];

    pool.query(createUser, values)
      .then((data) => {
        const newUser = data.rows[0];
        const { email } = newUser;
        const token = auth.makeToken(newUser);
        return res.status(201)
          .json({
            message: `User ${email} created successfully`,
            token
          });
      })
      .catch(err => res.status(500)
        .json({
          success: false,
          message: err.message
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
            const email = value;
            const token = auth.makeToken(user);
            return res.status(200)
              .json({
                success: true,
                message: `${email} logged in successfully`,
                token
              });
          }
          res.status(401)
            .json({
              success: false,
              message: 'Authentication failed. Try again',
            });
        }
        if (result.rowCount === 0) {
          res.status(404)
            .json({
              status: false,
              message: 'Invalid credentials',
            });
        }
      })
      .catch(err => res.status(500)
        .json({
          success: false,
          message: err.message
        }));
  }
}

export default UsersController;
