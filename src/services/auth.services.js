import { userRepository } from '../repository/user.repository.js';
import { cartRepository } from '../repository/cart.repository.js';
import { hashPassword, comparePassword } from '../utils/crypto.js';
import { generateToken,generatePasswordResetToken, verifyPasswordResetToken } from '../utils/jwt.js';
import { UserResponseDTO, UserCreateDTO } from '../dto/user.dto.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from './email.service.js';

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const newCart = await cartRepository.createCart();

    const userDTO = new UserCreateDTO(userData);
    userDTO.password = hashPassword(userDTO.password);
    userDTO.cart = newCart._id;

    const newUser = await userRepository.create(userDTO);

    sendWelcomeEmail(newUser).catch(err =>
      console.error('❌ Error enviando email de bienvenida:', err.message)
    );

    const token = generateToken(newUser);

    return {
      user: new UserResponseDTO(newUser),
      token
    };
  }

  async login(email, password) {
    const user = await userRepository.getByEmailWithPassword(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = generateToken(user);

    return {
      user: new UserResponseDTO(user),
      token
    };
  }

  async getCurrentUser(userId) {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return new UserResponseDTO(user);
  }

  async forgotPassword(email) {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new Error('Si el email existe, recibirás un correo de recuperación');
    }

    const resetToken = generatePasswordResetToken(user._id);

    await sendPasswordResetEmail(user, resetToken);

    return {
      message: 'Se ha enviado un email con instrucciones para restablecer tu contraseña'
    };
  }

  async resetPassword(token, newPassword) {

        console.log(`log del parametro token:  ${token}`)
        console.log(`log del parametro new password :  ${newPassword}`)


    const payload = verifyPasswordResetToken(token);
    console.log(`log del authSERVICE   ${payload}`)
    if (!payload) {
      throw new Error('Token inválido o expirado');
    }

    const user = await userRepository.getByEmailWithPassword(
      (await userRepository.getById(payload.id)).email
    );
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isSamePassword = comparePassword(newPassword, user.password);
    if (isSamePassword) {
      throw new Error('La nueva contraseña no puede ser igual a la anterior');
    }

    const hashedPassword = hashPassword(newPassword);

    await userRepository.update(user._id, { password: hashedPassword });

    return {
      message: 'Contraseña actualizada exitosamente'
    };
  }
}

export const authService = new AuthService();