import user from './users';
import message from './messages';

user.usersTable()
.then(() => message.messagesTable()
 .then(() => message.userMessageTable()
    .catch(error => console.log(error)))
