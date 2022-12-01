import 'dotenv/config';
import express from 'express';
import { auth } from 'express-openid-connect';
const app: express.Application = express();

import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import mongoose from 'mongoose';
import { db } from './models';

const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

app.use(express.json());        // With Express 4.16 and later, we no longer need body-parser.  Express does it.
app.use(express.urlencoded({ extended: true }));  // Must use extended option

app.get('/', (req, res) => {
  res.send('<h2>The Socratic Method App</h2> <p>See <a href="api-docs">/api-docs</a> endpoint for documentation.</p>');
});

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
.catch((error: any) => {
  console.log('Cannot connect to the Socrates database.', error);
  process.exit();
});

app.listen(port, () => {
  return console.log(`The Socratic Method is ready to serve up answers on port ${port}`);
});
