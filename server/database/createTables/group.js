import pool from '../dbconnect';

const groupsTable = `DROP TABLE IF EXISTS groups CASCADE;
    CREATE TABLE groups (
        id SERIAL PRIMARY KEY NOT NULL,
        ownerId INTEGER NOT NULL,
        name TEXT UNIQUE NOT NULL,
        createdOn TEXT NOT NULL,
        FOREIGN KEY (ownerId) references users (userId) on delete cascade
        )`;

const groupMembersTable = `DROP TABLE IF EXISTS groupMembersTable CASCADE;
      CREATE TABLE groupMembersTable (
        groupId SERIAL PRIMARY KEY NOT NULL,
        memberId INTEGER NOT NULL,
        email TEXT NOT NULL,
        addedOn TEXT NOT NULL,
        FOREIGN KEY (groupId) references groups (id) on delete cascade,
        FOREIGN KEY (memberId) references users (userId) on delete cascade
  )`;

// Class To Create GroupsTable
class GroupsTableHandler {
  static groupsTable() {
    const create = pool.query(groupsTable)
      .then(result => console.log(`groupsTable: ${result[0].command}PED and ${result[1].command}D`))
      .catch(error => console.log(`groups table ${error}`));
    return create;
  }

  // Class To Create GroupMembersTable
  static groupMembersTable() {
    const create = pool.query(groupMembersTable)
      .then(result => console.log(`groupMembersTable: ${result[0].command}PED and ${result[1].command}D`))
      .catch(error => console.log(`groupMembersTable: ${error}`));
    return create;
  }
}

export default GroupsTableHandler;
