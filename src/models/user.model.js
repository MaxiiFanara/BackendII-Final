import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  age: {
    type: Number,
    required: [true, 'La edad es requerida'],
    min: [1, 'La edad debe ser mayor a 0']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    select: false
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

export const userModel = mongoose.model(userCollection, userSchema);