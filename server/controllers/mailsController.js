/* eslint-disable class-methods-use-this */
import { mails } from '../database/database';

class MailsController {
  getMails(req, res) {
    const msgs = mails;
    if (msgs) {
      return res.status(200)
        .json({
          status: 200,
          data: [{
            message: 'Success: messages retrieved successfully!',
            mails
          }]
        });
    }
  }
}

const mailsController = new MailsController();
export default mailsController;
