import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './server/routes/router';
import api from './server/routes/api';
import indexRouter from './server/routes/index';

// Introduce the express middleware
const app = express();
dotenv.config();

const corsOptions = {
  origin: '*',
  credentials: true
};

// Use the CORS
app.use(cors(corsOptions));

// Bring in the morgan middleware
morgan('tiny');
app.use(morgan('tiny'));

// Introduce the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declare your port constant
const port = process.env.PORT || 3000;

// Bring in the user route
app.use(router);
app.use(api);
app.use(indexRouter);

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'EPIC-Mail', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for EPIC-Mail', // short description of the app
  },
  host: 'epic-m.herokuapp.com', // the host or url of the app
  basePath: '/api/v2', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./swagger-api/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/swagger-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

export default app;
