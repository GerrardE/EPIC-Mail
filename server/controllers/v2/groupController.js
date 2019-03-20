import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createGroup, getGroups, returnGroup
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

  static getGroups(req, res) {
    const decUser = req.decoded.payload;
    const userId = +decUser.userid;

    pool.query(getGroups, [userId])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedGroups = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Groups retrieved successfully!',
              retrievedGroups
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'No group found',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: err.message
        }));
  }
}

export default GroupController;
