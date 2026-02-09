import { BaseRepository } from './base.repository.js';
import { productDao } from '../daos/product.dao.js';

class ProductRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  getByCategory = async (category) => {
    return await this.dao.getByCategory(category);
  };

  getAvailable = async () => {
    return await this.dao.getAvailable();
  };

  updateStock = async (productId, newStock) => {
    return await this.dao.updateStock(productId, newStock);
  };

  decrementStock = async (productId, quantity) => {
    return await this.dao.decrementStock(productId, quantity);
  };
}

export const productRepository = new ProductRepository(productDao);