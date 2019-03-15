import express from 'express';

const indexRouter = express.Router();

// indexRouter.get('/', (req, res) => res.status(200).json({ message: 'Welcome to EPIC-Mail' }));


// indexRouter.all('*', (req, res) => res.status(404).json({ message: 'Not found Visit, https://epic-m.herokuapp.com/api/v1' }));

// indexRouter.all('/', (req, res) => res.status(404).json({ message: 'Not found Visit, https://epic-m.herokuapp.com/api/v1' }));


export default indexRouter;
