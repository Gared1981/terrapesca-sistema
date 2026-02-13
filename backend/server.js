const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Terrapesca API v1.0 - Sistema de Control de Compras',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba para verificar conexión a base de datos
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    database: process.env.DATABASE_URL ? 'Configurada' : 'No configurada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: true,
    message: 'Error interno del servidor'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Terrapesca corriendo en puerto ${PORT}`);
  console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Base de datos: ${process.env.DATABASE_URL ? 'Conectada' : 'No configurada'}`);
});
