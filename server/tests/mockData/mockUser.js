const correctUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const undefinedFirstName = {
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const unstringedFirstName = {
  firstName: ['John'],
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const emptyFirstName = {
  firstName: '',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const invalidFirstNameLength = {
  firstName: 'J',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const invalidFirstNameCharacter = {
  firstName: 'Joh$n',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const undefinedLastName = {
  firstName: 'John',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const unstringedLastName = {
  firstName: 'John',
  lastName: ['Doe'],
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const emptyLastName = {
  firstName: 'John',
  lastName: '',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const invalidLastNameLength = {
  firstName: 'John',
  lastName: 'D',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const invalidLastNameCharacter = {
  firstName: 'John',
  lastName: 'Do$e',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const undefinedEmail = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'johndoe'
};

const unstringedEmail = {
  firstName: 'John',
  lastName: 'Doe',
  email: ['johndoe@gmail.com'],
  password: 'johndoe'
};

const emptyEmail = {
  firstName: 'John',
  lastName: 'Doe',
  email: '',
  password: 'johndoe'
};

const invalidEmailLength = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'd@g.com',
  password: 'johndoe'
};

const invalidEmailCharacter = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'j%%##@gmail.#om',
  password: 'johndoe'
};

const existingEmail = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const undefinedPassword = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com'
};

const unstringedPassword = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: ['mypass', 'yourpass']
};

const emptyPassword = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: ''
};

const invalidPasswordLength = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'j'
};

const whitespacePassword = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  password: 'john doe'
};

const correctLogin = {
  email: 'johndoe@gmail.com',
  password: 'johndoe'
};

const undefinedEmailLogin = {
  password: 'johndoe'
};

const emptyEmailField = {
  email: '',
  password: 'johndoe'
};

const unstringedEmailLogin = {
  email: ['johndoe@gmail.com'],
  password: 'johndoe'
};

const nonExistingEmail = {
  email: 'johndoe@gmial.com',
  password: 'johndoe'
};

const undefinedPasswordLogin = {
  email: 'johndoe@gmail.com',
};

const emptyPasswordField = {
  email: 'johndoe@gmail.com',
  password: ''
};

const unstringedPasswordLogin = {
  email: 'johndoe@gmail.com',
  password: ['johndoe']
};

const correctEmailIncorrectPassword = {
  email: 'johndoe@gmail.com',
  password: 'john#doe'
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
