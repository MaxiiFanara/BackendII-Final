import { ticketRepository } from '../repository/ticket.repository.js';
import { cartRepository } from '../repository/cart.repository.js';
import { productRepository } from '../repository/product.repository.js';
import { userRepository } from '../repository/user.repository.js';
import { TicketResponseDTO, TicketCreateDTO } from '../dto/ticket.dto.js';
import { sendPurchaseTicket } from './email.service.js';

class TicketService {
  generateTicketCode() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TICKET-${timestamp}-${random}`;
  }

  async getAll() {
    const tickets = await ticketRepository.getAll();
    
    if (!tickets || tickets.length === 0) {
      return [];
    }
    
    return tickets.map(ticket => new TicketResponseDTO(ticket));
  }

  async getById(ticketId) {
    const ticket = await ticketRepository.getById(ticketId);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }
    return new TicketResponseDTO(ticket);
  }

  async getByPurchaser(email) {
    const tickets = await ticketRepository.getByPurchaser(email);
    
    if (!tickets || tickets.length === 0) {
      return [];
    }
    
    return tickets.map(ticket => new TicketResponseDTO(ticket));
  }

  async getByUser(userId) {
    const tickets = await ticketRepository.getByUser(userId);
    
    if (!tickets || tickets.length === 0) {
      return [];
    }
    
    return tickets.map(ticket => new TicketResponseDTO(ticket));
  }

  async purchaseCart(cartId, userId) {
    const cart = await cartRepository.getById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    if (cart.products.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const user = await userRepository.getById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const productsWithStock = [];
    const productsWithoutStock = [];

    for (const item of cart.products) {
      const productRef = item.product;
      const productId = productRef && productRef._id ? productRef._id : productRef;

      if (!productId) {
        productsWithoutStock.push({
          productId: null,
          reason: 'Referencia de producto inválida'
        });
        continue;
      }

      const product = await productRepository.getById(productId);

      if (!product) {
        productsWithoutStock.push({
          productId: productId,
          reason: 'Producto no encontrado'
        });
        continue;
      }

      if (product.stock >= item.quantity) {
        productsWithStock.push({
          product: product,
          quantity: item.quantity,
          price: item.price ?? product.price ?? 0,
          title: product.title
        });
      } else {
        productsWithoutStock.push({
          productId: product._id,
          title: product.title,
          requestedQuantity: item.quantity,
          availableStock: product.stock,
          reason: 'Stock insuficiente'
        });
      }
    }

    if (productsWithStock.length === 0) {
      throw new Error('No hay productos disponibles para completar la compra');
    }

    let totalAmount = 0;
    const ticketProducts = [];

    for (const item of productsWithStock) {
      const subtotal = item.price * item.quantity;
      totalAmount += subtotal;

      ticketProducts.push({
        product: item.product._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        subtotal: subtotal
      });

      await productRepository.decrementStock(item.product._id, item.quantity);
    }


    let ticketCode = this.generateTicketCode();
    
    while (await ticketRepository.existsByCode(ticketCode)) {
      ticketCode = this.generateTicketCode();
    }

    const ticketData = {
      code: ticketCode,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: user.email,
      user: user._id,
      products: ticketProducts
    };

    const ticketDTO = new TicketCreateDTO(ticketData);
    const newTicket = await ticketRepository.create(ticketDTO);

    for (const item of productsWithStock) {
      const prodIdToRemove = item.product && item.product._id ? item.product._id : item.product;
      await cartRepository.removeProduct(cartId, prodIdToRemove);
    }

    const ticketWithDetails = await ticketRepository.getById(newTicket._id);
    sendPurchaseTicket(user, ticketWithDetails).catch(err =>
      console.error('❌ Error enviando email de ticket:', err.message)
    );

    return {
      ticket: new TicketResponseDTO(newTicket),
      productsNotProcessed: productsWithoutStock
    };
  }

  async deleteTicket(ticketId) {
    const ticket = await ticketRepository.getById(ticketId);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }

    await ticketRepository.delete(ticketId);
    return { message: 'Ticket eliminado exitosamente' };
  }
}

export const ticketService = new TicketService();

