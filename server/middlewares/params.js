import { middleware } from 'express-param-validator';

class Params {
  static paramValidator(req, res, next) {
    const valid = middleware(req, res, next, {
      status: 'error',
      message: 'invalid id passed',
      errors: null
    });

    valid
      .isNumber('id')
      .check();
  }
}

export default Params;
