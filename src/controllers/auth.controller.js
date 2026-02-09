import { authService } from '../services/auth.services.js';

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Todos los campos son requeridos'
      });
    }

    const { user, token } = await authService.register({
      first_name,
      last_name,
      email,
      age,
      password,
      role
    });

    res.cookie('token', token, {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      user
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Email y contraseña son requeridos'
      });
    }

    const { user, token } = await authService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(200).json({
      status: 'success',
      message: 'Login exitoso',
      user
    });

  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error: error.message
    });
  }
};

export const current = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user._id);

    return res.status(200).json({
      status: 'success',
      user
    });

  } catch (error) {
    return res.status(404).json({
      status: 'error',
      error: error.message
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  
  return res.status(200).json({
    status: 'success',
    message: 'Logout exitoso'
  });};


  export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        error: 'El email es requerido'
      });
    }

    const result = await authService.forgotPassword(email);

    return res.status(200).json({
      status: 'success',
      message: result.message
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Validar campos requeridos
    if (!newPassword) {
      return res.status(400).json({
        status: 'error',
        error: 'La nueva contraseña es requerida'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        error: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    const result = await authService.resetPassword(token, newPassword);
     console.log(`log del controller: ${result}`)
    return res.status(200).json({
      status: 'success',
      message: result.message
    });

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};