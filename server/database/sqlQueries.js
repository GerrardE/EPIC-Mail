// Create User
const createUser = 'insert into users (firstName, lastName, email, role, password) values ($1, $2, $3, $4, $5) returning *';

// Login User
const emailLogin = 'select * from users where email = $1';

// Return user
const returnUser = 'select * from users where email = $1';

// Create Message
const createMessage = 'insert into messages (senderId, subject, message, email, createdOn) values($1, $2, $3, $4, $5) returning *';

// To user Message
const userMessage = 'insert into userMessage (userId, messageId, status) values ($1, $2, $3)';

// Get message
const getMessages = 'select * from messages left join userMessage on userId = $1 order by createdOn desc';

// Get unread messages
const getUnreadMessages = 'select * from messages left join userMessage on userId = $1 and status=$2 order by createdOn desc';

// Get sent messages
const getSentMessages = 'select * from messages left join userMessage on userId = $1 and status=$2 order by createdOn desc';

// Get specific message
const getMessage = 'select * from messages left join userMessage on userId = $1 where id=$2';

// Get sent messages
const deleteMessage = 'delete from userMessage where userId = $1 and messageId = $2';


export {
  createUser, emailLogin, returnUser, createMessage, userMessage,
  getMessages, getUnreadMessages,
  getSentMessages, getMessage, deleteMessage
};
