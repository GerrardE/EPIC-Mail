const correctUser = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const undefinedFirstName = {
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const unstringedFirstName = {
  firstName: ['James'],
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const emptyFirstName = {
  firstName: '',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const invalidFirstNameLength = {
  firstName: 'J',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const invalidFirstNameCharacter = {
  firstName: 'Joh$n',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const undefinedLastName = {
  firstName: 'James',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const unstringedLastName = {
  firstName: 'James',
  lastName: ['Done'],
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const emptyLastName = {
  firstName: 'James',
  lastName: '',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const invalidLastNameLength = {
  firstName: 'James',
  lastName: 'D',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const invalidLastNameCharacter = {
  firstName: 'James',
  lastName: 'Do$e',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const undefinedEmail = {
  firstName: 'James',
  lastName: 'Done',
  password: 'jamesdoe'
};

const unstringedEmail = {
  firstName: 'James',
  lastName: 'Done',
  email: ['jamesdoe@gmail.com'],
  password: 'jamesdoe'
};

const emptyEmail = {
  firstName: 'James',
  lastName: 'Done',
  email: '',
  password: 'jamesdoe'
};

const invalidEmailLength = {
  firstName: 'James',
  lastName: 'Done',
  email: 'd@g.com',
  password: 'jamesdoe'
};

const invalidEmailCharacter = {
  firstName: 'James',
  lastName: 'Done',
  email: 'j%%##@gmail.#om',
  password: 'jamesdoe'
};

const existingEmail = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe'
};

const undefinedPassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjang@gmail.com'
};

const unstringedPassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjoe@gmail.com',
  password: ['mypass', 'yourpass']
};

const emptyPassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjoe@gmail.com',
  password: ''
};

const invalidPasswordLength = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjoe@gmail.com',
  password: 'j'
};

const whitespacePassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'hallyjoe@gmail.com',
  password: ' '
};

const correctLogin = {
    email: 'jamesdoe@gmail.com',
    password: 'jamesdoe'
};

const undefinedEmailLogin = {
  password: 'johndoe'
};

const emptyEmailField = {
  email: '',
  password: 'jamesdoe'
};

const unstringedEmailLogin = {
  email: ['jamesdoe@gmail.com'],
  password: 'jamesdoe'
};

const nonExistingEmail = {
  email: 'Jamesdoe@gmial.com',
  password: 'jamesdoe'
};

const undefinedPasswordLogin = {
  email: 'johndoe@gmail.com',
};

const emptyPasswordField = {
  email: 'jamesdoe@gmail.com',
  password: ''
};

const unstringedPasswordLogin = {
  email: 'johndoe@gmail.com',
  password: ['jamesdoe']
};

const correctEmailIncorrectPassword = {
  email: 'johndoe@gmail.com',
  password: 'Jamesdroeh'
};

export {
  correctUser, undefinedFirstName, unstringedFirstName,
  emptyFirstName, invalidFirstNameLength, invalidFirstNameCharacter,
  undefinedLastName, unstringedLastName, emptyLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, unstringedEmail, emptyEmail, invalidEmailLength,
  invalidEmailCharacter, existingEmail, undefinedPassword, unstringedPassword, emptyPassword,
  invalidPasswordLength, whitespacePassword, correctLogin, undefinedEmailLogin, emptyEmailField,
  unstringedEmailLogin, nonExistingEmail, undefinedPasswordLogin, emptyPasswordField,
  unstringedPasswordLogin, correctEmailIncorrectPassword
};
