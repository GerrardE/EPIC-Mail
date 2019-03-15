import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.status(200).json({ message: 'Welcome to EPIC-Mail' }));

indexRouter.all('*', (req, res) => res.status(404).json({ message: 'Page not found' }));

export default indexRouter;
