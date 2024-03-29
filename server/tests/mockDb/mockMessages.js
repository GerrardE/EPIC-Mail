const correctMessage = {
  toEmail: 'kaylaperry@epic-mail.com',
  subject: 'First Subject',
  message: 'First Message',
  status: 'sent'
};

const undefinedSubject = {
  toEmail: 'kaylaperry@epic-mail.com',
  message: 'First Message',
};

const undefinedMessage = {
  toEmail: 'kaylaperry@epic-mail.com',
  subject: 'First Subject'
};

const undefinedToEmail = {
  subject: 'First Subject',
  message: 'First Message'
};

const emptySubject = {
  toEmail: 'kaylaperry@epic-mail.com',
  subject: '',
  message: 'First Message'
};

const emptyMessage = {
  toEmail: 'kaylaperry@epic-mail.com',
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
