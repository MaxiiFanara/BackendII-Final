import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'La cantidad debe ser al menos 1']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

cartSchema.index({ user: 1 });

export const cartModel = mongoose.model(cartCollection, cartSchema);