import express from 'express';
import pg from 'pg';
import UsersController from '../controllers/v2/usersController';
import { signupValidator, loginCheck } from '../middlewares/user';
import MailValidatorHandler from '../middlewares/mail';
import MailsController from '../controllers/v2/mailsController';
import auth from '../helpers/auth';

// Introduce the express router middleware
const api = express.Router();

// User Auth Routes
api.post('/api/v2/auth/signup', signupValidator, UsersController.createUser);
api.post('/api/v2/auth/login', loginCheck, UsersController.userLogin);

// Message Routes
api.post('/api/v2/messages', auth.verifyToken, MailValidatorHandler.validMail, MailsController.createMail);
api.get('/api/v2/messages', auth.verifyToken, MailsController.getMails);
api.get('/api/v2/messages/unread', auth.verifyToken, MailsController.getUnreadMails);
api.get('/api/v2/messages/sent', auth.verifyToken, MailsController.getSentMails);
api.get('/api/v2/messages/:id', auth.verifyToken, MailsController.getMail);
api.delete('/api/v2/messages/:id', auth.verifyToken, MailsController.deleteMail);

export default api;
