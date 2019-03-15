import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './server/routes/router';
import indexRouter from './server/routes/index';
// Introduce the express middleware
const app = express();

// Bring in the morgan middleware
morgan('tiny');
dotenv.config();

// Introduce the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declare your port constant
const port = process.env.PORT || 3000;

// Bring in the user route
app.use(router);
app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

export default app;
