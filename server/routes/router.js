import express from 'express';
import UsersController from '../controllers/usersController';
import { signupValidator, loginValidator } from '../middlewares/user';
import createMailValidator from '../middlewares/mail';
import MailsController from '../controllers/mailsController';
import auth from '../helpers/auth';

// Introduce the express router middleware
const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', signupValidator, UsersController.createUser);
router.post('/api/v1/auth/login', loginValidator, UsersController.userLogin);

// Message Routes
router.post('/api/v1/messages', createMailValidator, MailsController.createMail);
router.get('/api/v1/messages', auth.verifyToken, MailsController.getMails);
router.get('/api/v1/users/:userId/messages', auth.verifyToken, MailsController.getUserMails);
router.get('/api/v1/messages/unread', MailsController.getUnreadMails);
router.get('/api/v1/messages/sent', MailsController.getSentMails);
router.get('/api/v1/messages/:id', MailsController.getMail);
router.delete('/api/v1/messages/:id', MailsController.deleteMail);

export default router;
