import pool from '../dbconnect';

const createMessagesTable = `DROP TABLE IF EXISTS messages CASCADE;
    CREATE TABLE messages (
        id SERIAL PRIMARY KEY NOT NULL,
        senderId INTEGER NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        parentMessageId INTEGER,
        createdOn TEXT NOT NULL
        )`;
     
const userMessageTable = `DROP TABLE IF EXISTS userMessage CASCADE;
      CREATE TABLE userMessage (
        userId INTEGER NOT NULL,
        messageId INTEGER NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (messageId) references messages (id) on delete cascade,
        FOREIGN KEY (userId) references users (userId) on delete cascade
  )`;

// Class To Create Messages Table
class MessagesTableHandler {
  static messagesTable() {
    const create = pool.query(createMessagesTable)
      .then(result => console.log(`messagesTable: ${result[0].command}PED and ${result[1].command}D`))
      .catch(error => console.log(`messages table ${error}`));
    return create;
  }

  static userMessageTable() {
    const create = pool.query(userMessageTable)
      .then(result => console.log(`userMessageTable: ${result[0].command}PED and ${result[1].command}D`))
      .catch(error => console.log(`userMessageTable: ${error}`));
    return create;
  }
}

export default MessagesTableHandler;
