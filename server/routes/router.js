import express from 'express';
import bodyParser from 'body-parser';
import usersController from '../controllers/usersController';
import mailsController from '../controllers/mailsController';

// Introduce the express router middleware
const router = express.Router();

// Introduce the body parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// User Auth Routes
router.post('/api/v1/auth/signup', usersController.createUser);
router.post('/api/v1/auth/login', usersController.userLogin);

// Message Routes
router.post('/api/v1/messages', mailsController.createMail);
router.get('/api/v1/messages', mailsController.getMails);
router.get('/api/v1/messages/unread', mailsController.getUnreadMails);
router.get('/api/v1/messages/sent', mailsController.getSentMails);
router.get('/api/v1/messages/:id', mailsController.getMail);

export default router;
