const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'johndoe',
    email: 'johndoe@gmail.com',
    role: 0,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Joe',
    email: 'janejoe@gmail.com',
    password: 'janejoe',
    role: 0,
  },
];

const mails = [
  {
    id: 1,
    createdOn: Date(),
    subject: 'First subject',
    message: 'First message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'unread'
  },
  {
    id: 2,
    createdOn: Date(),
    subject: 'Second subject',
    message: 'Second message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'read'
  },
  {
    id: 3,
    createdOn: Date(),
    subject: 'Third subject',
    message: 'Third message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'unread'
  },
  {
    id: 4,
    createdOn: Date(),
    subject: 'Fourth subject',
    message: 'Fourth message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'sent'
  },
  {
    id: 5,
    createdOn: Date(),
    subject: 'Fifth subject',
    message: 'Fifth message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'sent'
  },
];

export { users, mails };
