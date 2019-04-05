// Create User
const createUser = 'insert into users (firstName, lastName, email, password) values ($1, $2, $3, $4) returning *';

// Login User
const emailLogin = 'select * from users where email = $1';

// Return user
const returnUser = 'select * from users where email = $1';

// Create Message
const createMessage = 'insert into messages (senderId, subject, message, email, createdOn) values ($1, $2, $3, $4, $5) returning *';

// To user Message
const userMessage = 'insert into userMessage (userId, messageId, status) values ($1, $2, $3)';

// Get message
const getMessages = 'select * from messages left join userMessage on userId = $1 order by createdOn desc';

// Get unread messages
const getUnreadMessages = 'select * from messages left join userMessage on userId = $1 and status=$2 order by createdOn desc';

// Get unread by email
const getUnread = 'select * from messages where email = $1 order by createdOn desc';

// Get sent messages
const getSentMessages = 'select * from messages left join userMessage on userId = $1 and status=$2 where senderid = $1 order by createdOn desc';

// Get sent messages
const getSent = 'select * from messages where senderid = $1 order by createdOn desc';

// Get specific message
const getMessage = 'select * from messages left join userMessage on userid = $1 and messageid = id where id=$2';

// Delete messages
const deleteMessage = 'delete from userMessage where userid = $1 and messageid = $2 returning *';

// Return an existing group
const returnGroup = 'select * from groups where name = $1';

// Create a group
const createGroup = 'insert into groups (ownerId, name, createdOn) values ($1, $2, $3) returning *';

// Get groups
const getGroups = 'select * from groups where ownerId = $1';

// Edit group
const editGroup = 'update groups set name=$2 where id=$1 returning *';

// Delete group
const deleteGroup = 'delete from groups where ownerId=$1 and id=$2 returning *';

// Return an existing group member
const returnMember = 'select * from users where email = $1';

// Return an existing group
const checkGroup = 'select * from groups where ownerId = $1';

// Create a group
const addUser = 'insert into groupMembers (email, groupId, memberId, addedOn) values ($1, $2, $3, $4) returning *';

// Delete group member
const deleteMember = 'delete from groupMembers where groupId=$1 and memberId=$2;';

// return specific group
const returnGrp = 'select * from groups where id=$1;';

// check for a group
const groupCheck = 'select * from groups where ownerId=$1 and id=$2;';

const returnMemberIds = 'select memberId from groupMembers where groupId=$1;';

const sendGroupMessage = 'insert into messages (senderId, subject, message, email, createdOn) values ($1, $2, $3, $4, $5) returning *;';

export {
  createUser, emailLogin, returnUser, createMessage, userMessage, editGroup, deleteGroup, returnMember, addUser, checkGroup, returnGrp,
  getMessages, getGroups, getUnreadMessages, getUnread, getSent,
  getSentMessages, getMessage, deleteMessage, returnMemberIds, createGroup, returnGroup, deleteMember, groupCheck, sendGroupMessage
};
