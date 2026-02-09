import { MongoDAO } from "./mongo.dao.js";
import { cartModel } from "../models/cart.model.js";

class CartDaoMongo extends MongoDAO {
  constructor() {
    super(cartModel);
  }

  getById = async (id) => {
    try {
      return await this.model.findById(id).populate('products.product');
    } catch (error) {
      throw new Error(`Error al obtener carrito por ID: ${error.message}`);
    }
  };

  getByUser = async (userId) => {
    try {
      return await this.model.findOne({ user: userId }).populate('products.product');
    } catch (error) {
      throw new Error(`Error al obtener carrito por usuario: ${error.message}`);
    }
  };

  addProduct = async (cartId, productId, quantity = 1, price) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId.toString()
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity, price });
      }

      await cart.save();
      return await this.model.findById(cartId).populate('products.product');
      
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  };

  updateProductQuantity = async (cartId, productId, newQuantity) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId.toString()
      );

      if (productIndex === -1) {
        throw new Error('Producto no encontrado en el carrito');
      }

      cart.products[productIndex].quantity = newQuantity;
      await cart.save();
      
      return await this.model.findById(cartId).populate('products.product');
      
    } catch (error) {
      throw new Error(`Error al actualizar cantidad: ${error.message}`);
    }
  };

  removeProduct = async (cartId, productId) => {
    try {
      const result = await this.model.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: productId } } },
        { new: true }
      ).populate('products.product');
      
      return result;
      
    } catch (error) {
      throw new Error(`Error al remover producto del carrito: ${error.message}`);
    }
  };

  clearCart = async (cartId) => {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al vaciar carrito: ${error.message}`);
    }
  };

  productExists = async (cartId, productId) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        return false;
      }
      return cart.products.some(
        p => p.product.toString() === productId.toString()
      );
    } catch (error) {
      throw new Error(`Error al verificar producto en carrito: ${error.message}`);
    }
  };
}

export const cartDao = new CartDaoMongo();