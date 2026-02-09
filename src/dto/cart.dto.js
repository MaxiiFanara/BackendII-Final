export class CartResponseDTO {
  constructor(cart) {
    this.id = cart._id;
    this.products = cart.products.map(item => ({
      product: item.product._id ? {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        stock: item.product.stock,
        thumbnail: item.product.thumbnail
      } : item.product,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price
    }));
    this.total = this.products.reduce((acc, item) => acc + item.subtotal, 0);
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}

export class AddProductToCartDTO {
  constructor(data) {
    this.productId = data.productId;
    this.quantity = parseInt(data.quantity) || 1;
    this.price = parseFloat(data.price);
  }
}

export class UpdateCartProductDTO {
  constructor(data) {
    this.quantity = parseInt(data.quantity);
  }
}