const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validación simple (en producción usar bcrypt)
    const validUsers = {
      'Fernanda': { password: 'Fer1234.', nivel: 'ADMIN', nombre: 'Fernanda' },
      'Edgar': { password: '9970002', nivel: 'MASTER', nombre: 'Edgar' }
    };
    
    const user = validUsers[username];
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: true, message: 'Credenciales incorrectas' });
    }
    
    // Registrar en auditoría
    await query(`
      INSERT INTO auditoria (usuario, accion, modulo, observaciones)
      VALUES ($1, 'LOGIN', 'Sistema', 'Inicio de sesión exitoso')
    `, [username]);
    
    res.json({
      success: true,
      user: {
        username: user.nombre,
        nivel: user.nivel
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: true, message: 'Error en el servidor' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { username } = req.body;
    
    await query(`
      INSERT INTO auditoria (usuario, accion, modulo, observaciones)
      VALUES ($1, 'LOGOUT', 'Sistema', 'Cierre de sesión')
    `, [username]);
    
    res.json({ success: true, message: 'Sesión cerrada' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Error al cerrar sesión' });
  }
});

module.exports = router;
