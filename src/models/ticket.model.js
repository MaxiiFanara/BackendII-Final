import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'El código es requerido'],
    unique: true,
    uppercase: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'El monto total es requerido'],
    min: [0, 'El monto no puede ser negativo']
  },
  purchaser: {
    type: String,
    required: [true, 'El email del comprador es requerido'],
    lowercase: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'El usuario comprador es requerido']
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});

// Índices
ticketSchema.index({ purchaser: 1 });
ticketSchema.index({ user: 1 });
ticketSchema.index({ purchase_datetime: -1 });

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);