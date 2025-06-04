
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

import invoiceRoutes from './routes/invoiceRoutes.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());


app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('hello world')
})


mongoose
.connect(process.env.MONGO_URI, {
 
})
  .then(() => {
  
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch((err) => {
    
  });
