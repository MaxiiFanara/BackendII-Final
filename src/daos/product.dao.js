import { MongoDAO } from "./mongo.dao.js";
import { productModel } from "../models/product.model.js";

class ProductDaoMongo extends MongoDAO {
  constructor() {
    super(productModel);
  }

  getByCategory = async (category) => {
    try {
      return await this.model.find({ category });
    } catch (error) {
      throw new Error(`Error al obtener productos por categoría: ${error.message}`);
    }
  };

  getAvailable = async () => {
    try {
      return await this.model.find({ stock: { $gt: 0 }, status: true });
    } catch (error) {
      throw new Error(`Error al obtener productos disponibles: ${error.message}`);
    }
  };

  updateStock = async (productId, newStock) => {
    try {
      return await this.model.findByIdAndUpdate(
        productId,
        { stock: newStock },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  };

  decrementStock = async (productId, quantity) => {
    try {
      return await this.model.findByIdAndUpdate(
        productId,
        { $inc: { stock: -quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al decrementar stock: ${error.message}`);
    }
  };
}

export const productDao = new ProductDaoMongo();