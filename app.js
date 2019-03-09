import express from 'express';
import morgan from 'morgan';
import router from './server/routes/router';
// Introduce the express middleware
const app = express();

// Bring in the morgan middleware
morgan('tiny');

// declare your port constant
const port = 4000;

// Bring in the user route
app.use(router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

export default app;
