const correctMessage = {
  toEmail: 'johndoe@gmail.com',
  subject: 'First Subject',
  message: 'First Message'
};

const undefinedSubject = {
  toEmail: 'johndoe@gmail.com',
  message: 'First Message'
};

const undefinedMessage = {
  toEmail: 'johndoe@gmail.com',
  subject: 'First Subject'
};

const undefinedToEmail = {
  subject: 'First Subject',
  message: 'First Message'
};

const emptySubject = {
  toEmail: 'johndoe@gmail.com',
  subject: '',
  message: 'First Message'
};

const emptyMessage = {
  toEmail: 'johndoe@gmail.com',
  subject: 'First Subject',
  message: ''
};

const emptyToEmail = {
  toEmail: '',
  subject: 'First Subject',
  message: 'First Message'
};

export {
  correctMessage, undefinedMessage, undefinedSubject, emptyMessage, emptySubject, 
  undefinedToEmail, emptyToEmail
};
