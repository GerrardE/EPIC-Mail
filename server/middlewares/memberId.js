import middleware from 'express-params-validator';

class Params {
  static paramValidator(req, res, next) {
    const valid = middleware(req, res, next, {
      status: 400,
      message: 'Error: invalid member id passed',
    });

    valid
      .isNumber('id')
      .check();

    next();
  }
}

export default Params;
