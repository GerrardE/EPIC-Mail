import user from './users';
import message from './messages';
import group from './group';

user.usersTable()
  .then(() => message.messagesTable()
    .then(() => message.userMessageTable()
      .then(() => group.groupsTable()
        .then(() => group.groupMembersTable()
          .then(() => message.groupMessagesTable()
            .catch(error => console.log(error)))))));
