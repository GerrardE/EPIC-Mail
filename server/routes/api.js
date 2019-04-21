import express from 'express';
import UsersController from '../controllers/v2/usersController';
import { signupValidator, loginCheck } from '../middlewares/user';
import valid from '../middlewares/mail';
import MailsController from '../controllers/v2/mailsController';
import groupValidator from '../middlewares/group';
import group from '../controllers/v2/groupController';
import params from '../middlewares/params';
import member from '../middlewares/member';
import auth from '../helpers/auth';

// Introduce the express router middleware
const api = express.Router();

// User Auth Routes
api.post('/api/v2/auth/signup', signupValidator, UsersController.createUser);
api.post('/api/v2/auth/login', loginCheck, UsersController.userLogin);

// Message Routes
api.post('/api/v2/messages', auth.verifyToken, valid.validMail, MailsController.createMail);
api.get('/api/v2/messages', auth.verifyToken, MailsController.getMails);
api.patch('/api/v2/messages/:id', auth.verifyToken, params.paramValidator, MailsController.updateStatus);
api.get('/api/v2/messages/unread', auth.verifyToken, MailsController.getUnread);
api.get('/api/v2/messages/read', auth.verifyToken, MailsController.getRead);
api.get('/api/v2/messages/sent', auth.verifyToken, MailsController.getSentMails);
api.get('/api/v2/messages/:id', auth.verifyToken, params.paramValidator, MailsController.getMail);
api.patch('/api/v2/messages/:id/delete', auth.verifyToken, params.paramValidator, MailsController.deleteMail);
api.delete('/api/v2/messages/:id', auth.verifyToken, params.paramValidator, MailsController.retractMail);

// Group Routes
api.post('/api/v2/groups', auth.verifyToken, groupValidator.validGroupName, group.createGroup);
api.get('/api/v2/groups', auth.verifyToken, group.getGroups);
api.patch('/api/v2/groups/:id/name', auth.verifyToken, params.paramValidator, group.editGroup);
api.delete('/api/v2/groups/:id', auth.verifyToken, params.paramValidator, group.deleteGroup);
api.post('/api/v2/groups/:id/users', auth.verifyToken, params.paramValidator, groupValidator.validMember, group.addUser);
api.get('/api/v2/groups/:id/users', auth.verifyToken, params.paramValidator, group.getGroupUsers);
api.delete('/api/v2/groups/:id/users/:memberid', auth.verifyToken, params.paramValidator, member.paramValidator, group.deleteUser);
api.post('/api/v2/groups/:id/messages', auth.verifyToken, params.paramValidator, valid.groupMail, group.sendGroupMail);

export default api;
