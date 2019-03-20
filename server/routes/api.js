import express from 'express';
import UsersController from '../controllers/v2/usersController';
import { signupValidator, loginCheck } from '../middlewares/user';
import MailValidatorHandler from '../middlewares/mail';
import MailsController from '../controllers/v2/mailsController';
import groupValidator from '../middlewares/group';
import group from '../controllers/v2/groupController';
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

// Group Routes
api.post('/api/v2/groups', auth.verifyToken, groupValidator.validGroupName, group.createGroup);
api.get('/api/v2/groups', auth.verifyToken, group.getGroups);
api.patch('/api/v2/groups/:id/name', auth.verifyToken, groupValidator.validGroupName, group.editGroup);
api.delete('/api/v2/groups/:id', auth.verifyToken, group.deleteGroup);

export default api;
