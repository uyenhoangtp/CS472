import express from 'express';
import productRouter from './routes/productRoutes';
import reviewRouter from './routes/reviewRoutes';
import cors from 'cors';
import aiRouter from './routes/aiRoutes'; // Renamed import
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/products', productRouter);
app.use('/products', reviewRouter);

app.use('/api/ai', aiRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});