/**
 * DTO para enviar información del ticket al cliente
 */
export class TicketResponseDTO {
  constructor(ticket) {
    if (!ticket) {
      throw new Error('Ticket inválido o nulo');
    }

    this.id = ticket._id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    
    // Proteger contra productos eliminados o nulos
    this.products = (ticket.products || []).map(item => ({
      product: item.product && item.product._id ? {
        id: item.product._id,
        title: item.product.title
      } : {
        id: null,
        title: 'Producto eliminado'
      },
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal
    }));
    
    this.createdAt = ticket.createdAt;
    this.updatedAt = ticket.updatedAt;
  }
}

export class TicketCreateDTO {
  constructor(data) {
    this.code = data.code;
    this.purchase_datetime = data.purchase_datetime || new Date();
    this.amount = parseFloat(data.amount);
    this.purchaser = data.purchaser;
    this.user = data.user;
    this.products = data.products.map(item => ({
      product: item.product,
      title: item.title,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.price),
      subtotal: parseFloat(item.price) * parseInt(item.quantity)
    }));
  }
}