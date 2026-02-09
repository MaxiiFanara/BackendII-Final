import mongoose from 'mongoose';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'El título es requerido'],
    minlength: [5, 'El título debe tener al menos 5 caracteres'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'La descripción es requerida'],
    minlength: [20, 'La descripción debe tener al menos 20 caracteres'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  status: { 
    type: Boolean, 
    default: true
  },
  stock: { 
    type: Number, 
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  category: { 
    type: String, 
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  thumbnail: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para búsquedas comunes
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });

export const productModel = mongoose.model(productCollection, productSchema);