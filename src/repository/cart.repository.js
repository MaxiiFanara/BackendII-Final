import { BaseRepository } from './base.repository.js';
import { cartDao } from '../daos/cart.dao.js';

class CartRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  createCart = async (userId = null) => {
    return await this.dao.create({ products: [], user: userId });
  };

  getByUser = async (userId) => {
    return await this.dao.getByUser(userId);
  };

  addProduct = async (cartId, productId, quantity, price) => {
    return await this.dao.addProduct(cartId, productId, quantity, price);
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    return await this.dao.updateProductQuantity(cartId, productId, quantity);
  };

  removeProduct = async (cartId, productId) => {
    return await this.dao.removeProduct(cartId, productId);
  };

  clearCart = async (cartId) => {
    return await this.dao.clearCart(cartId);
  };

  productExists = async (cartId, productId) => {
    return await this.dao.productExists(cartId, productId);
  };
}

export const cartRepository = new CartRepository(cartDao);