const correctMessage = {
  toEmail: 'terryperry@epic-mail.com',
  subject: 'First Subject',
  message: 'First Message'
};

const undefinedSubject = {
  toEmail: 'terryperry@epic-mail.com',
  message: 'First Message'
};

const undefinedMessage = {
  toEmail: 'terryperry@epic-mail.com',
  subject: 'First Subject'
};

const undefinedToEmail = {
  subject: 'First Subject',
  message: 'First Message'
};

const emptySubject = {
  toEmail: 'terryperry@epic-mail.com',
  subject: '',
  message: 'First Message'
};

const emptyMessage = {
  toEmail: 'terryperry@epic-mail.com',
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
