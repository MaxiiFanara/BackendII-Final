import { cartRepository } from '../repository/cart.repository.js';
import { productRepository } from '../repository/product.repository.js';
import { userRepository } from '../repository/user.repository.js';
import { CartResponseDTO, AddProductToCartDTO, UpdateCartProductDTO } from '../dto/cart.dto.js';

class CartService {
  async getById(cartId) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return new CartResponseDTO(cart);
  }

  async getByUser(userId) {
    const cart = await cartRepository.getByUser(userId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return new CartResponseDTO(cart);
  }

  async createCart(userId = null) {
    const newCart = await cartRepository.createCart(userId);
    return new CartResponseDTO(newCart);
  }

  async addProduct(cartId, productData) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const product = await productRepository.getById(productData.productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.stock < productData.quantity) {
      throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
    }

    if (!product.status) {
      throw new Error('El producto no está disponible');
    }

    const addProductDTO = new AddProductToCartDTO(productData);
    addProductDTO.price = product.price;

    const updatedCart = await cartRepository.addProduct(
      cartId,
      addProductDTO.productId,
      addProductDTO.quantity,
      addProductDTO.price
    );

    return new CartResponseDTO(updatedCart);
  }

  async updateProductQuantity(cartId, productId, quantityData) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productExists = await cartRepository.productExists(cartId, productId);
    if (!productExists) {
      throw new Error('El producto no está en el carrito');
    }

    const product = await productRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const updateDTO = new UpdateCartProductDTO(quantityData);

    if (product.stock < updateDTO.quantity) {
      throw new Error(`Stock insuficiente. Disponible: ${product.stock}`);
    }

    const updatedCart = await cartRepository.updateProductQuantity(
      cartId,
      productId,
      updateDTO.quantity
    );

    return new CartResponseDTO(updatedCart);
  }

  async removeProduct(cartId, productId) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productExists = await cartRepository.productExists(cartId, productId);
    if (!productExists) {
      throw new Error('El producto no está en el carrito');
    }

    const updatedCart = await cartRepository.removeProduct(cartId, productId);
    return new CartResponseDTO(updatedCart);
  }

  async clearCart(cartId) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const clearedCart = await cartRepository.clearCart(cartId);
    return new CartResponseDTO(clearedCart);
  }

  async deleteCart(cartId) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    await cartRepository.delete(cartId);
    return { message: 'Carrito eliminado exitosamente' };
  }
}

export const cartService = new CartService();