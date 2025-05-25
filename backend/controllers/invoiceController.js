
import asyncHandler from 'express-async-handler';
import Invoice from '../models/Invoice.js';

export const createInvoice = asyncHandler(async (req, res) => {
  console.log('🔥 req.body =', JSON.stringify(req.body, null, 2));
  
  const { customerName, items, totalAmount } = req.body;

  if (!customerName || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('customerName and at least one item are required');
  }

  const invoice = await Invoice.create({ customerName, items, totalAmount });
  res.status(201).json(invoice);
});

export const getInvoices = asyncHandler(async (_req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});



