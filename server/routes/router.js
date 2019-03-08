import express from 'express';
import bodyParser from 'body-parser';
import usersController from '../controllers/usersController';

// Introduce the express router middleware
const router = express.Router();

// Introduce the body parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// User Auth Routes
router.post('/api/v1/auth/signup', usersController.createUser);


export default router;
