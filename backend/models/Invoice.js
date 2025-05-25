
import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  productId: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  sku: {
    type: String,
    required : true,
  }
});

const invoiceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  items: [invoiceItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;

