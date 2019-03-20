import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createGroup, getGroups, returnGroup, editGroup, deleteGroup
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

  static editGroup(req, res) {
    const decUser = req.decoded.payload;
    const userId = +decUser.userid;
    let { name, groupId } = req.params;
    groupId = +groupId;
    const values = [name, groupId, userId];

    pool.query(editGroup, [values])
      .then((data) => {
        if (data.rowCount !== 0) {
          const editedGroup = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Group edited successfully!',
              editedGroup
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'This group was not found',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: err.message
        }));
  }

  static deleteGroup(req, res) {
    const decUser = req.decoded.payload;
    const ownerId = +decUser.userid;
    const { id } = req.params;

    pool.query(deleteGroup, [ownerId, id])
      .then((data) => {
        if (data.rowCount !== 0) {
          const deletedGroup = data.rows[0];
          return res.status(201)
            .send({
              success: true,
              message: 'Group deleted successfully!',
              deletedGroup
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Something happened. Try again'
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
