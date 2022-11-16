import 'dotenv/config';
import express from 'express';
const app: express.Application = express();

import mongoose from 'mongoose';
const port = process.env.PORT || 3000;


app.use(express.json());        // With Express 4.16 and later, we no longer need body-parser.  Express does it.
app.use(express.urlencoded({ extended: true }));  // Must use extended option

app.get('/', (req, res) => {
  res.send('<h2>The Socratic Method App</h2> <p>See <code>/api-docs</code> endpoint for documentation.</p>');
});
app.use('/users', require('./routes/users'));

app.listen(port, () => {
  return console.log(`Server is running on port ${port}`);
});
