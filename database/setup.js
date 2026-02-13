const { pool } = require('../config/database');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Iniciando setup de base de datos...');
    
    await client.query('BEGIN');
    
    // Crear tabla de usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        nivel VARCHAR(20) NOT NULL CHECK (nivel IN ('ADMIN', 'MASTER')),
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla usuarios creada');
    
    // Insertar usuarios por defecto
    await client.query(`
      INSERT INTO usuarios (username, password, nombre, nivel)
      VALUES 
        ('Fernanda', '$2a$10$xQ8vZ1234567890abcdefghijklmnopqrstuv', 'Fernanda', 'ADMIN'),
        ('Edgar', '$2a$10$yR9wA1234567890abcdefghijklmnopqrstuv', 'Edgar', 'MASTER')
      ON CONFLICT (username) DO NOTHING
    `);
    console.log('✅ Usuarios por defecto creados');
    
    // Crear tabla de productos
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        codigo_limpio VARCHAR(50) NOT NULL,
        descripcion TEXT NOT NULL,
        categoria VARCHAR(200),
        subcategoria VARCHAR(200),
        costo DECIMAL(10,2) NOT NULL,
        moneda_original VARCHAR(20),
        unidad VARCHAR(50),
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_codigo_limpio ON productos(codigo_limpio)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_descripcion ON productos USING gin(to_tsvector('spanish', descripcion))`);
    console.log('✅ Tabla productos creada con índices');
    
    // Crear tabla de empleados
    await client.query(`
      CREATE TABLE IF NOT EXISTS empleados (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        sucursal VARCHAR(100) NOT NULL,
        deuda_articulos DECIMAL(10,2) DEFAULT 0,
        deuda_vales DECIMAL(10,2) DEFAULT 0,
        limite_credito DECIMAL(10,2) DEFAULT 10000,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla empleados creada');
    
    // Insertar empleados iniciales
    const empleados = [
      { nombre: 'VARELA MEDINA MARIA FERNANDA', sucursal: 'Los Mochis', deuda: 11095.86 },
      { nombre: 'VALDEZ GASTELUM JUAN MIGUEL', sucursal: 'Los Mochis', deuda: 3953.52 },
      { nombre: 'GIL FLORES ADAN ALEJANDRO', sucursal: 'Los Mochis', deuda: 3493.38 },
      { nombre: 'ANAYA TORRES IRAN LIZANDRO', sucursal: 'Los Mochis', deuda: 5019.53 },
      { nombre: 'FLORES MARQUEZ JOSE GILBERTO', sucursal: 'Los Mochis', deuda: 22132.59 },
      { nombre: 'LLAMAS ASTORGA JORGE LUIS', sucursal: 'Los Mochis', deuda: 6928.17 },
      { nombre: 'ARMENTA CRUZ EDGAR SAID', sucursal: 'Los Mochis/Culiacán', deuda: 13417.20 },
      { nombre: 'TIZNADO COTA OSCAR ALEJANDRO', sucursal: 'Los Mochis', deuda: 10383.76 },
      { nombre: 'BASTIDAS GUZMAN OSCAR ALEXIS', sucursal: 'Los Mochis', deuda: 9100.32 },
      { nombre: 'GASTELUM LOPEZ JEIDY PAULINA', sucursal: 'Los Mochis', deuda: 4011.86 },
      { nombre: 'ANAYA TORRES HERBEY FERNANDO', sucursal: 'Los Mochis', deuda: 3031.79 },
      { nombre: 'FUENTES QUINTERO MARTHA ABIGAIL', sucursal: 'Los Mochis', deuda: 3685.80 },
      { nombre: 'ISLAS CARBAJAL ABRAHAM', sucursal: 'Los Mochis', deuda: 0 },
      { nombre: 'LOZOYA HERNÁNDEZ CARLOS', sucursal: 'Los Mochis/Mazatlán', deuda: 35801.16 },
      { nombre: 'VELÁZQUEZ BASTIDAS CINTHYA SORAYA', sucursal: 'Mazatlán', deuda: 0 },
      { nombre: 'ROMERO GÓMEZ EDGAR HUMBERTO', sucursal: 'Mazatlán/Culiacán', deuda: 9117.26 },
      { nombre: 'RAFAEL ANTONIO BARRIOS FLORES', sucursal: 'Mazatlán', deuda: 0 },
      { nombre: 'CARLOS JESÚS URÍAS OSUNA', sucursal: 'Mazatlán', deuda: 0 },
      { nombre: 'URTUSUASTEGUI MARTINEZ JOSE DANIEL', sucursal: 'Culiacán', deuda: 2430.87 },
      { nombre: 'MIRANDA ORDUÑO EDUARDO', sucursal: 'Culiacán', deuda: 3396.70 },
      { nombre: 'GASTELUM SOTO JORGE ABRAHAM', sucursal: 'Los Mochis/Culiacán', deuda: 14122.80 }
    ];
    
    for (const emp of empleados) {
      await client.query(`
        INSERT INTO empleados (nombre, sucursal, deuda_articulos)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
      `, [emp.nombre, emp.sucursal, emp.deuda]);
    }
    console.log(`✅ ${empleados.length} empleados creados`);
    
    // Crear tabla de compras
    await client.query(`
      CREATE TABLE IF NOT EXISTS compras (
        id SERIAL PRIMARY KEY,
        folio VARCHAR(50) UNIQUE NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        empleado_id INTEGER REFERENCES empleados(id),
        total DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        iva DECIMAL(10,2) NOT NULL,
        usuario_registro VARCHAR(100) NOT NULL,
        autorizado_por VARCHAR(100),
        observaciones TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS compras_detalle (
        id SERIAL PRIMARY KEY,
        compra_id INTEGER REFERENCES compras(id) ON DELETE CASCADE,
        producto_id INTEGER REFERENCES productos(id),
        folio_erp VARCHAR(50),
        codigo VARCHAR(50),
        descripcion TEXT NOT NULL,
        cantidad INTEGER NOT NULL,
        costo DECIMAL(10,2) NOT NULL,
        precio_final DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('✅ Tablas de compras creadas');
    
    // Crear tabla de abonos
    await client.query(`
      CREATE TABLE IF NOT EXISTS abonos (
        id SERIAL PRIMARY KEY,
        folio VARCHAR(50) UNIQUE NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        empleado_id INTEGER REFERENCES empleados(id),
        monto DECIMAL(10,2) NOT NULL,
        tipo VARCHAR(20) CHECK (tipo IN ('articulos', 'vales', 'total')),
        forma_pago VARCHAR(50) NOT NULL,
        referencia VARCHAR(100),
        usuario_registro VARCHAR(100) NOT NULL,
        observaciones TEXT,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla abonos creada');
    
    // Crear tabla de vales
    await client.query(`
      CREATE TABLE IF NOT EXISTS vales (
        id SERIAL PRIMARY KEY,
        folio VARCHAR(50) UNIQUE NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        empleado_id INTEGER REFERENCES empleados(id),
        monto DECIMAL(10,2) NOT NULL,
        concepto TEXT NOT NULL,
        fecha_compromiso DATE,
        usuario_registro VARCHAR(100) NOT NULL,
        estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'PAGADO')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla vales creada');
    
    // Crear tabla de configuración
    await client.query(`
      CREATE TABLE IF NOT EXISTS configuracion (
        id SERIAL PRIMARY KEY,
        clave VARCHAR(100) UNIQUE NOT NULL,
        valor TEXT NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        descripcion TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await client.query(`
      INSERT INTO configuracion (clave, valor, tipo, descripcion)
      VALUES 
        ('limite_credito', '10000', 'decimal', 'Límite de crédito por empleado'),
        ('limite_caja_chica', '1000', 'decimal', 'Límite máximo de vales'),
        ('monto_autorizacion_master', '3000', 'decimal', 'Monto que requiere autorización Master'),
        ('porcentaje_utilidad', '10', 'decimal', 'Porcentaje de utilidad sobre costo'),
        ('iva', '16', 'decimal', 'Porcentaje de IVA'),
        ('tipo_cambio', '19.50', 'decimal', 'Tipo de cambio USD a MXN')
      ON CONFLICT (clave) DO NOTHING
    `);
    console.log('✅ Tabla configuración creada');
    
    // Crear tabla de log de auditoría
    await client.query(`
      CREATE TABLE IF NOT EXISTS auditoria (
        id SERIAL PRIMARY KEY,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        usuario VARCHAR(100) NOT NULL,
        accion VARCHAR(100) NOT NULL,
        modulo VARCHAR(50) NOT NULL,
        folio VARCHAR(50),
        datos_anteriores TEXT,
        datos_nuevos TEXT,
        ip VARCHAR(50),
        observaciones TEXT
      )
    `);
    console.log('✅ Tabla auditoría creada');
    
    await client.query('COMMIT');
    console.log('✅ Setup completado exitosamente!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error en setup:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Ejecutar setup
setupDatabase()
  .then(() => {
    console.log('🎉 Base de datos lista para usar');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
