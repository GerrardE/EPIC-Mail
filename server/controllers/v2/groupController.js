import moment from 'moment';
import pool from '../../database/dbconnect';
import {
  createGroup, getGroups, returnGroup, editGroup, deleteGroup, returnMember, addUser, checkGroup,
  deleteMember, returnGrp, groupCheck, returnGroupMembers, returnMemberIds, sendGroupMessage
} from '../../database/sqlQueries';

class GroupController {
  static createGroup(req, res) {
    const decUser = req.decoded;
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
                message: 'Success: group created successfully!',
                newGroup
              });
            })
            .catch(err => res.status(500).send({
              success: false,
              message: 'Error: server did not respond. Please try again.'
            }));
        }
        return res.status(400).send({
          success: false,
          message: 'Error: this name is taken. Please try again'
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Error: server not responding. Please try again.'
      }));
  }

  static getGroups(req, res) {
    const decUser = req.decoded;
    const userId = +decUser.userid;

    pool.query(getGroups, [userId])
      .then((data) => {
        if (data.rowCount !== 0) {
          const retrievedGroups = data.rows;
          return res.status(200)
            .send({
              success: true,
              message: 'Success: groups retrieved successfully!',
              retrievedGroups
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Error: no group found'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: server not responding. Please try again.'
        }));
  }

  static editGroup(req, res) {
    const decUser = req.decoded;
    const userId = Number(decUser.userid);
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
              message: 'Success: group edited successfully!',
              editedGroup
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Error: group not found',
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: group could not be edited. Try again'
        }));
  }

  static deleteGroup(req, res) {
    const decUser = req.decoded;
    const ownerId = +decUser.userid;
    const { id } = req.params;

    pool.query(deleteGroup, [ownerId, id])
      .then((data) => {
        if (data.rowCount !== 0) {
          const deletedGroup = data.rows[0];
          return res.status(200)
            .send({
              success: true,
              message: 'Success: group deleted successfully!',
              deletedGroup
            });
        }
        return res.status(500)
          .send({
            success: false,
            message: 'Error: group could not be deleted. Try again'
          });
      })
      .catch(err => res.status(500)
        .send({
          success: false,
          message: 'Error: server not responding. Try again'
        }));
  }

  static addUser(req, res) {
    const decUser = req.decoded;
    const ownerId = Number(decUser.userid);
    const groupId = +req.params.id;
    const {
      email
    } = req.body;

    // check if user exists
    pool.query(returnMember, [email])
      .then((result) => {
        if (result.rowCount > 0) {
          const values = [email, groupId, result.rows[0].userid, moment().format('llll')];
          // select the user's group
          return pool.query(checkGroup, [ownerId])
            .then((detail) => {
              // check that there is a result in the array
              if (detail.rowCount !== 0) {
                // query the database and add the user
                return pool.query(addUser, values)
                  .then((data) => {
                    const newMember = data.rows[0];
                    return res.status(200).send({
                      success: true,
                      message: 'Group member added successfully!',
                      newMember
                    });
                  })
                  .catch(err => res.status(500).send({
                    success: false,
                    message: 'Error: user not added. Try again'
                  }));
              }
              return res.status(400).send({
                success: false,
                message: 'Error: group does not exist. Try again.'
              });
            });
        }
        return res.status(400).send({
          success: false,
          message: 'Error: user does not exist. Try again.'
        });
      })
      .catch(err => res.status(500).send({
        success: false,
        message: 'Error: server not responding. Try again.'
      }));
  }

  static getGroupUsers(req, res) {
    const decUser = req.decoded;
    const ownerId = Number(decUser.userid);
    const groupId = Number(req.params.id);

    // check if group exists
    pool.query(groupCheck, [ownerId, groupId])
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400)
            .send({
              success: false,
              message: 'Error: group not found.'
            });
        }
        if (result.rowCount > 0 && result.rows[0].ownerid === ownerId) {
          return pool.query(returnGroupMembers, [groupId])
            .then((data) => {
              if (data.rowCount > 0) {
                return res.status(200)
                  .send({
                    success: true,
                    message: 'Success: group members retrieved.',
                    returnedMembers: data.rows
                  });
              }
              return res.status(400)
                .send({
                  success: false,
                  message: 'Error: no one here. Try adding someone.'
                });
            }).catch((err) => {
              console.log(err.message);
              return res.status(400)
                .send({
                  success: false,
                  message: 'Error: no one here. Try adding someone.'
                });
            });
        }
        if (result.rowCount > 0 && result.rows[0].ownerid !== ownerId) {
          return res.status(404)
            .send({
              success: false,
              message: 'Error: this group doesn\'t belong to you.'
            });
        }
      }).catch((err) => {
        console.log(err.message);
        return res.status(400)
          .send({
            success: false,
            message: 'Error: group does not exist.'
          });
      });
  }

  static deleteUser(req, res) {
    let { userid } = req.decoded;
    let { id, memberid } = req.params;
    userid = Number(userid);
    id = Number(id);
    memberid = Number(memberid);

    pool.query(returnGrp, [id])
      .then(async (data) => {
        if (data.rowCount !== 0 && data.rows[0].ownerid === userid) {
          try {
            await pool.query(deleteMember, [id, memberid]);
            return res.status(200)
              .send({
                success: true,
                message: 'Success: group member deleted successfully'
              });
          } catch (err) {
            console.log(err);
            return res.status(400)
              .send({
                success: false,
                message: 'Error: group member could not be deleted. Try again.'
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          success: false,
          message: 'Error: group does not exist',
        });
      });
  }

  static sendGroupMail(req, res) {
    const decUser = req.decoded;
    const fromEmail = decUser.email;
    const ownerId = Number(decUser.userid);
    const groupId = Number(req.params.id);

    const values = [ownerId, groupId];

    // check if group exists
    pool.query(groupCheck, values)
      .then((result) => {
        // check for the row count if greater than 0
        if (result.rowCount > 0) {
          return pool.query(returnMemberIds, [groupId])
            .then((data) => {
              // check for members
              if (data.rowCount < 0) {
                return res.status(400).send({
                  success: false,
                  message: 'Error: no member found on the group.'
                });
              } // end check for members

              // this array will hold all member ids
              const members = [];
              data.rows.forEach(m => members.push(m.memberid));
              const {
                subject, message, status
              } = req.body;

              // create an email
              const toMessage = [ownerId, fromEmail, subject, message, `group${groupId}@epic-mail.com`, status, moment().format('llll')];
              return pool.query(sendGroupMessage, toMessage)
                .then((detail) => {
                  const groupMsg = detail.rows;

                  // insert the messageId, status and userId in user messages
                  return pool
                    .query(`INSERT INTO usermessage (userid, messageid, status) 
                    values ((unnest(array[${members}])), 
                    ${detail.rows[0].id}, 
                    ${status}) 
                    returning *`)
                    .then((val) => {
                      console.log(val)
                      return res.status(200)
                        .send({
                          success: true,
                          message: 'Success: group message sent successfully!',
                          groupMsg
                        });
                    })
                    .catch(() => res.status(400).send({
                      success: false,
                      message: 'Error: message not sent. Try again.'
                    }));
                })
                .catch(err => res.status(500).send({
                  success: false,
                  message: 'Error: server taking too long to respond. Try again.'
                }));
            }) // end data block
            .catch(err => res.status(500)
              .send({
                success: false,
                message: 'Error: server could not respond. Try again.'
              }));
        }
        return res.status(400).send({
          success: false,
          message: 'Error: group does not exist.'
        });
      })
      .catch(err => res.status(500).send({
        success: 'Error: server not responding. Try again.'
      }));
  }
}

export default GroupController;
