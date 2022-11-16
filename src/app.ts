import 'dotenv/config';
import express from 'express';
const app = express();

import mongoose from 'mongoose';
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Socratic Method!');
});
app.use('/users', require('./routes/users'));

app.listen(port, () => {
  return console.log(`Server is running on port ${port}`);
});
