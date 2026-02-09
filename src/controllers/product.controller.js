import { productService } from '../services/product.service.js';

export const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();

    return res.status(200).json({
      status: 'success',
      products
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getById(id);

    return res.status(200).json({
      status: 'success',
      product
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const { title, description, price, stock, category, thumbnail } = req.body;

    if (!title || !description || !price || stock === undefined || !category) {
      return res.status(400).json({
        status: 'error',
        error: 'Todos los campos son requeridos (title, description, price, stock, category)'
      });
    }

    const newProduct = await productService.create({
      title,
      description,
      price,
      stock,
      category,
      thumbnail
    });

    return res.status(201).json({
      status: 'success',
      message: 'Producto creado exitosamente',
      product: newProduct
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Debe proporcionar al menos un campo para actualizar'
      });
    }

    const updatedProduct = await productService.update(id, updateData);

    return res.status(200).json({
      status: 'success',
      message: 'Producto actualizado exitosamente',
      product: updatedProduct
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.delete(id);

    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado exitosamente'
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await productService.getByCategory(category);

    return res.status(200).json({
      status: 'success',
      count: products.length,
      products
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getAvailable = async (req, res) => {
  try {
    const products = await productService.getAvailable();

    return res.status(200).json({
      status: 'success',
      count: products.length,
      products
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
};

