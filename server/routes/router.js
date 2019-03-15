import express from 'express';
import { createUser, userLogin } from '../controllers/usersController';
import { signupValidator, loginValidator } from '../middlewares/user';
import createMailValidator from '../middlewares/mail';
import {
  createMail, getMails, getUnreadMails, getSentMails, getMail, deleteMail
} from '../controllers/mailsController';

// Introduce the express router middleware
const router = express.Router();

// User Auth Routes
router.post('/api/v1/auth/signup', signupValidator, createUser);
router.post('/api/v1/auth/login', loginValidator, userLogin);

// Message Routes
router.post('/api/v1/messages', createMailValidator, createMail);
router.get('/api/v1/messages', getMails);
router.get('/api/v1/messages/unread', getUnreadMails);
router.get('/api/v1/messages/sent', getSentMails);
router.get('/api/v1/messages/:id', getMail);
router.delete('/api/v1/messages/:id', deleteMail);

export default router;
