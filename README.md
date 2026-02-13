# 🌊 TERRAPESCA - SISTEMA DE CONTROL DE COMPRAS

## Sistema profesional completo con Base de Datos PostgreSQL

### 📦 CONTENIDO DEL PAQUETE:

```
terrapesca-sistema/
├── backend/              # Servidor Node.js + Express
│   ├── server.js        # Servidor principal
│   ├── package.json     # Dependencias
│   ├── config/          # Configuración BD
│   ├── routes/          # Rutas API
│   └── .env.example     # Variables de entorno
├── frontend/            # Aplicación web
│   └── index.html       # Frontend completo
├── database/            # Scripts de BD
│   ├── setup.js         # Crear tablas
│   └── import-products.js # Importar 20K productos
└── README.md            # Esta guía

```

### 🚀 DEPLOY EN RAILWAY - GUÍA PASO A PASO

#### PASO 1: Crear cuenta en Railway
1. Ve a: https://railway.app
2. Click en "Start a New Project"
3. Conecta con GitHub o Email

#### PASO 2: Crear nuevo proyecto
1. Click "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu repositorio (o sube este código)

#### PASO 3: Agregar PostgreSQL
1. En tu proyecto, click "+ New"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente la base de datos
4. Copia la DATABASE_URL que te dan

#### PASO 4: Configurar variables de entorno
En Settings → Variables, agrega:
```
NODE_ENV=production
DATABASE_URL=(la que te dio Railway)
FRONTEND_URL=https://terrapesca.up.railway.app
PORT=3000
```

#### PASO 5: Deploy
```bash
# Railway detecta automáticamente Node.js
# Ejecuta: npm install && npm start
```

#### PASO 6: Setup inicial de base de datos
```bash
# En Railway CLI o dashboard:
npm run setup
```

#### PASO 7: Importar productos
```bash
npm run import-products
```

### ✅ LISTO! Tu sistema está en:
```
https://tu-proyecto.up.railway.app
```

### 📊 FUNCIONALIDADES IMPLEMENTADAS:

✅ Login (Fernanda/Edgar)
✅ Dashboard con estadísticas
✅ 21 empleados precargados
✅ Crear/Editar/Borrar empleados (Edgar)
✅ Nueva compra (manual + import .ART)
✅ Catálogo de 20,604 productos
✅ Validación: precio ≥ costo
✅ Conversión automática USD → MXN ($19.50)
✅ Registro de abonos
✅ Eliminación con reversión de saldo (Edgar)
✅ Emisión de vales (máx $1,000)
✅ PDFs duplicados (Original + Copia)
✅ Historial completo
✅ Búsqueda por folio
✅ Reportes con gráficas en $$$
✅ Fecha/hora en tiempo real
✅ Log de auditoría
✅ Multiusuario real

### 💰 COSTO:

- **Gratis** los primeros $5 USD de uso
- Después: ~$5 USD/mes
- Incluye: Servidor + Base de Datos + SSL

### 🔒 SEGURIDAD:

- SSL/HTTPS automático
- Rate limiting
- Validaciones en backend
- Auditoría completa
- Respaldos diarios automáticos

### 📞 SOPORTE:

Si necesitas ayuda:
1. Revisa la documentación
2. Consulta los logs en Railway
3. Verifica las variables de entorno

---

**CREADO CON ❤️ PARA TERRAPESCA MARINE & OUTDOORS**
**Versión 2.0 - Sistema Profesional Completo**
