
class GroupValidatorHandler {
  static validGroupName(req, res, next) {
    let {
      name
    } = req.body;

    if (name === undefined) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name field cannot be empty',       
        });
    }
    if (name === '') {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name field cannot be empty',
            
        });
    }
    if (name.includes(' ')) {
      return res.status(400)
        .send({
          status: 400,
          message: 'Error: name cannot include space.'
        });
    }
    name = name.trim().toString();
    if (name.length < 2) {
      return res.status(400).send({
        status: 400,
        error: 'Error: name should be over 2 characters long'
      });
    }

    next();
  }
}

export default GroupValidatorHandler;
