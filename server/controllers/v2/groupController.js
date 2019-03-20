import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createGroup, getGroups, returnGroup, editGroup, deleteGroup, returnMember, addUser, checkGroup,
  deleteMember
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
    let { id } = req.params;
    const { name } = req.body;

    id = Number(id); 
    const values = [id, name];

    pool.query(editGroup, values)
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

  static addUser(req, res) {
    const decUser = req.decoded.payload;
    const ownerId = Number(decUser.userid);
    const groupId = +req.params.id;
    const {
      email
    } = req.body;

    // check if user exists
    pool.query(returnMember, [email])
      .then((result) => {
        if (result.rowCount !== 0) {
          const values = [email, groupId, result.rows[0].userid, moment().format('llll')];
          return pool.query(checkGroup, [ownerId])
            .then((detail) => {
              if (detail.rowCount !== 0) {
                return pool.query(addUser, values)
                  .then((data) => {
                    const newMember = data.rows[0];
                    return res.status(201).send({
                      success: true,
                      message: 'Group member added successfully!',
                      newMember
                    });
                  })
                  .catch(err => res.status(500).send({
                    success: false,
                    message: err.message
                  }));
              }
              return res.status(400).send({
                success: false,
                message: 'This group does not exist. Try again'
              });
            });
        }
        return res.status(400).send({
          success: false,
          message: 'An error occured. Try again'
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        message: err.message
      }));
  }
}

export default GroupController;
