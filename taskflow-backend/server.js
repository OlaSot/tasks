import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import logRoutes from './routes/logRoutes.js';



import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.set("trust proxy", true);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
