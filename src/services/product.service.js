import { productRepository } from '../repository/product.repository.js';
import { ProductResponseDTO, ProductCreateDTO, ProductUpdateDTO } from '../dto/product.dto.js';

class ProductService {
  async getAll() {
    const products = await productRepository.getAll();
    return products.map(product => new ProductResponseDTO(product));
  }

  async getById(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return new ProductResponseDTO(product);
  }

  async create(productData) {
    const productDTO = new ProductCreateDTO(productData);
    const newProduct = await productRepository.create(productDTO);
    return new ProductResponseDTO(newProduct);
  }

  async update(id, productData) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    const productDTO = new ProductUpdateDTO(productData);
    const updatedProduct = await productRepository.update(id, productDTO);
    return new ProductResponseDTO(updatedProduct);
  }

  async delete(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return await productRepository.delete(id);
  }


  async getByCategory(category) {
    const products = await productRepository.getByCategory(category);
    return products.map(product => new ProductResponseDTO(product));
  }

  async getAvailable() {
    const products = await productRepository.getAvailable();
    return products.map(product => new ProductResponseDTO(product));
  }

  async decrementStock(productId, quantity) {
    const product = await productRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.stock < quantity) {
      throw new Error('Stock insuficiente');
    }

    const updatedProduct = await productRepository.decrementStock(productId, quantity);
    return new ProductResponseDTO(updatedProduct);
  }
}

export const productService = new ProductService();