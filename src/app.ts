import 'dotenv/config';
import express from 'express';
const app: express.Application = express();

import * as swaggerUI from 'swagger-ui-express';
const swaggerDocument = require('../swagger.json')

import mongoose from 'mongoose';
const port = process.env.PORT || 3000;


app.use(express.json());        // With Express 4.16 and later, we no longer need body-parser.  Express does it.
app.use(express.urlencoded({ extended: true }));  // Must use extended option

app.get('/', (req, res) => {
  res.send('<h2>The Socratic Method App</h2> <p>See <a href="api-docs">/api-docs</a> endpoint for documentation.</p>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/authorization', require('./routes/auth'));
app.use('/questions', require('./routes/questions'));
app.use('/answers', require('./routes/answers'));
app.use('/comments', require('./routes/comments'));
app.use('/users', require('./routes/users'));

app.listen(port, () => {
  return console.log(`The Socratic Method is ready to serve up answers on port ${port}`);
});
