
import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
dotenv.config();


connectToMongo();

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
 app.use('/api/auth', authRoutes);
 app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})