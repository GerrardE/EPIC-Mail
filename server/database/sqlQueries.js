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

// Return an existing group
const returnGroup = 'select * from groups where name = $1';

// Create a group
const createGroup = 'insert into groups (ownerId, name, createdOn) values ($1, $2, $3) returning *';

// Get groups
const getGroups = 'select * from groups where ownerId = $1';

// Edit group
const editGroup = 'update groups set name=$1 where id=$2 and ownerId=$3 returning *';

export {
  createUser, emailLogin, returnUser, createMessage, userMessage, editGroup,
  getMessages, getGroups, getUnreadMessages,
  getSentMessages, getMessage, deleteMessage, createGroup, returnGroup,
};
