import middleware from 'express-params-validator';

class Params {
  static paramValidator(req, res, next) {
    const valid = middleware(req, res, next, {
      status: 'error',
      message: 'invalid member id passed',
      errors: null
    });

    valid
      .isNumber('id')
      .check();

    next();
  }
}

export default Params;
