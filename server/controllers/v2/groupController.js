import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createGroup, checkGroup, returnGroup, getMessages, getUnreadMessages, getSentMessages, getMessage, deleteMessage
} from '../../database/sqlQueries';

class GroupController {
  static createGroup(req, res) {
    const decUser = req.decoded.payload;
    const ownerId = +decUser.userid;

    const {
      name
    } = req.body;

    const values = [ownerId, name, moment().format('llll')];

    // check if group exists
    pool.query(returnGroup, [name])
      .then((result) => {
        if (result.rowCount === 0) {
          return pool.query(createGroup, values)
            .then((data) => {
              const newGroup = data.rows[0];
              return res.status(201).send({
                success: true,
                message: 'Group created successfully!',
                newGroup
              });
            })
            .catch(err => res.status(500).send({
              success: false,
              message: err.message
            }));
        }
        return res.status(400).send({
          success: false,
          message: 'This name is taken. Try again'
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        message: err.message
      }));
  }
}

export default GroupController;
