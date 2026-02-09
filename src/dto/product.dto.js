export class ProductResponseDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.status = product.status;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnail = product.thumbnail;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

export class ProductCreateDTO {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.price = parseFloat(data.price);
    this.status = data.status !== undefined ? data.status : true;
    this.stock = parseInt(data.stock);
    this.category = data.category;
    this.thumbnail = data.thumbnail || null;
  }
}

export class ProductUpdateDTO {
  constructor(data) {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.price) this.price = parseFloat(data.price);
    if (data.status !== undefined) this.status = data.status;
    if (data.stock !== undefined) this.stock = parseInt(data.stock);
    if (data.category) this.category = data.category;
    if (data.thumbnail !== undefined) this.thumbnail = data.thumbnail;
  }
}