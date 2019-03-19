import user from './users';
import message from './messages';
import group from './group';

// user.usersTable()
// .then(() => message.messagesTable()
//  .then(() => message.userMessageTable()
//     .catch(error => console.log(error)))

group.groupsTable()
  .then(() => group.groupMembersTable()
    .catch(error => console.log(error)));
