import validator from 'validator';
import isEmpty from './isEmpty';

const validMessage = (data) => {
  let errors = {};
  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.toEmail = !isEmpty(data.toEmail) ? data.toEmail : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  // Subject validations
  if (validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }

  // Email validations
  if (validator.isEmpty(data.toEmail)) {
    errors.toEmail = 'Receiver email field is required';
  }

  if (!validator.isEmail(data.toEmail)) {
    errors.toEmail = 'Receiver email is invalid';
  }

  // Message validations
  if (validator.isEmpty(data.message)) {
    errors.message = 'Message field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validMessage;
