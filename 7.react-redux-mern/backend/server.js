import express from 'express';
import connectDB from './config/db.js';
import colors from 'colors';
import dotenv from 'dotenv';

import customerRoutes from './routes/customerRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/customer/', customerRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
