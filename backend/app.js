
import express from 'express';
import {connectDB} from './config/db.js'

const app = express();


connectDB();


app.use(express.json());


const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');


app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

module.exports = app;
