/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import express from 'express';
import path from 'path';
const app: express.Application = express();

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import mongoose from 'mongoose';
import { db } from './models';

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());        // With Express 4.16 and later, we no longer need body-parser.  Express does it.
app.use(express.urlencoded({ extended: true }));  // Must use extended option

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/authorization', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/answers', require('./routes/answers'));
app.use('/comments', require('./routes/comments'));
app.use('/users', require('./routes/users'));

db.mongoose.connect(db.url as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => { 
  console.log('Connected to the Socrates database.')
})
.catch((error: Error) => {
  console.log('Cannot connect to the Socrates database.', error);
  process.exit();
});

app.listen(port, () => {
  return console.log(`The Socratic Method is ready to serve up answers on port ${port}`);
});
