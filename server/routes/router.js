import express from 'express';
import UsersController from '../controllers/v1/usersController';
import { signupValidator, loginValidator } from '../middlewares/user';
import MailValidatorHandler from '../middlewares/mail';
import MailsController from '../controllers/v1/mailsController';
import params from '../middlewares/params';
import auth from '../helpers/auth';

// Introduce the express router middleware
const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', signupValidator, UsersController.createUser);
router.post('/api/v1/auth/login', loginValidator, UsersController.userLogin);

// Message Routes
router.post('/api/v1/messages', auth.verifyToken, MailValidatorHandler.createMailValidator, MailsController.createMail);
router.get('/api/v1/messages', auth.verifyToken, MailsController.getMails);
router.get('/api/v1/messages/unread', auth.verifyToken, MailsController.getUnreadMails);
router.get('/api/v1/messages/sent', auth.verifyToken, MailsController.getSentMails);
router.get('/api/v1/messages/:id', auth.verifyToken, params.paramValidator, MailsController.getMail);
router.delete('/api/v1/messages/:id', auth.verifyToken, params.paramValidator, MailsController.deleteMail);

export default router;
