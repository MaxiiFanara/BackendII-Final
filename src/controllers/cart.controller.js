import { cartService } from '../services/cart.services.js';

export const getById = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartService.getById(cid);

    return res.status(200).json({
      status: 'success',
      cart
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const getByUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const cart = await cartService.getByUser(uid);

    return res.status(200).json({
      status: 'success',
      cart
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const createCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const newCart = await cartService.createCart(userId);

    return res.status(201).json({
      status: 'success',
      message: 'Carrito creado exitosamente',
      cart: newCart
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { cid } = req.params;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        status: 'error',
        error: 'Los campos productId y quantity son requeridos'
      });
    }

    const updatedCart = await cartService.addProduct(cid, {
      productId,
      quantity
    });

    return res.status(200).json({
      status: 'success',
      message: 'Producto agregado al carrito',
      cart: updatedCart
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        status: 'error',
        error: 'El campo quantity es requerido'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        status: 'error',
        error: 'La cantidad debe ser mayor a 0'
      });
    }

    const updatedCart = await cartService.updateProductQuantity(cid, pid, {
      quantity
    });

    return res.status(200).json({
      status: 'success',
      message: 'Cantidad actualizada',
      cart: updatedCart
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const updatedCart = await cartService.removeProduct(cid, pid);

    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado del carrito',
      cart: updatedCart
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const clearedCart = await cartService.clearCart(cid);

    return res.status(200).json({
      status: 'success',
      message: 'Carrito vaciado',
      cart: clearedCart
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;

    await cartService.deleteCart(cid);

    return res.status(200).json({
      status: 'success',
      message: 'Carrito eliminado exitosamente'
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};