import pool from '../dbconnect';

const createUsersTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        userId SERIAL PRIMARY KEY NOT NULL,
        firstName CHARACTER VARYING(50) NOT NULL,
        lastName CHARACTER VARYING(50) NOT NULL,
        email CHARACTER VARYING(100) UNIQUE NOT NULL,
        password CHARACTER VARYING(255) NOT NULL
    )`;

// Class To Create User Table
class UsersTableHandler {
  static usersTable() {
    const create = pool.query(createUsersTable)
      .then(result => console.log(`usersTable: ${result[0].command}PED and ${result[1].command}D`))
      .catch(error => console.log(`users table ${error}`));
    return create;
  }
}

export default UsersTableHandler;
