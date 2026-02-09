
export class UserResponseDTO {
  constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}


export class UserCreateDTO {
  constructor(data) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email.toLowerCase().trim();
    this.age = parseInt(data.age);
    this.password = data.password;
    this.role = data.role || 'user';
    this.cart = data.cart || null;
  }
}

export class UserUpdateDTO {
  constructor(data) {
    if (data.first_name) this.first_name = data.first_name;
    if (data.last_name) this.last_name = data.last_name;
    if (data.email) this.email = data.email.toLowerCase().trim();
    if (data.age) this.age = parseInt(data.age);
    if (data.role) this.role = data.role;
    if (data.cart) this.cart = data.cart;
  }
}