import validator from 'validator';
import isEmpty from './isEmpty';

const validRegistration = (data) => {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Name validations
  if (!validator.isLength(data.firstName, { min: 2, max: 50 })) {
    errors.firstName = 'First name should be 2 to 50 aplhabets long';
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field cannot be empty';
  }

  if (!validator.isLength(data.lastName, { min: 2, max: 50 })) {
    errors.lastName = 'Last name should be 2 to 50 aplhabets long';
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field cannot be empty';
  }

  // Email validations
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password validations
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validRegistration;
