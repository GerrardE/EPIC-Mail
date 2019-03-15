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

const people = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'johndoe',
    email: 'johndoe@gmail.com',
    role: 0,
    mails: [
      {
        id: 1,
        createdOn: Date(),
        fromEmail: 'testtested@gmail.com',
        subject: 'First subject',
        message: 'First message',
        senderId: 10,
        receiverId: 1, // possible foreign key
        parentMessageId: 1,
        status: 'unread'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Joe',
    email: 'janejoe@gmail.com',
    password: 'janejoe',
    role: 0,
    mails: [
      {
        id: 1,
        createdOn: Date(),
        fromEmail: 'testtested@gmail.com',
        subject: 'First subject',
        message: 'First message',
        senderId: 10,
        receiverId: 2,
        parentMessageId: 1,
        status: 'unread'
      }
    ]
  },
];

const mails = [
  {
    id: 2,
    createdOn: Date(),
    fromEmail: 'tomdoejoe@gmail.com',
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
    fromEmail: 'janedoe@gmail.com',
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
    fromEmail: 'casperjoe@gmail.com',
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
    fromEmail: 'emilyjoe@gmail.com',
    subject: 'Fifth subject',
    message: 'Fifth message',
    senderId: 10,
    receiverId: 20,
    parentMessageId: 1,
    status: 'sent'
  },
];

// {
//   "firstName": "Gerrard",
//   "lastName": "Ezeugwa",
//   "email": "ezeugwagerrard@gmail.com",
//   "password": "ezeugwagerrard",
//   "role": 0
// }

export { users, mails, people };
