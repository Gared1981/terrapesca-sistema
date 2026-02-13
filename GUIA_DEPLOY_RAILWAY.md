# 🚂 GUÍA COMPLETA DE DEPLOY EN RAILWAY

## 📋 ANTES DE EMPEZAR

Necesitas:
- ✅ Cuenta en Railway (gratis): https://railway.app
- ✅ Este código (ya lo tienes)
- ✅ 15-20 minutos

---

## 🎯 PASO A PASO DETALLADO

### **PASO 1: Crear Cuenta en Railway** ⏱️ 2 min

1. Ve a: **https://railway.app**
2. Click en **"Start a New Project"**
3. Elige:
   - 📧 Sign up with Email, O
   - 🐙 Sign up with GitHub (recomendado)
4. Verifica tu email
5. ¡Listo! Ya tienes cuenta

---

### **PASO 2: Crear Nuevo Proyecto** ⏱️ 1 min

1. En el Dashboard, click **"+ New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Si es tu primera vez:
   - Autoriza a Railway acceso a GitHub
   - Selecciona "All repositories" o solo este
4. Selecciona el repositorio **terrapesca-sistema**
5. Railway comenzará el deploy automático

---

### **PASO 3: Agregar Base de Datos PostgreSQL** ⏱️ 2 min

1. En tu proyecto, click **"+ New"** (esquina superior derecha)
2. Selecciona **"Database"**
3. Elige **"PostgreSQL"**
4. Railway creará la base de datos automáticamente
5. Espera 30 segundos a que esté lista
6. ✅ ¡Base de datos creada!

---

### **PASO 4: Obtener DATABASE_URL** ⏱️ 1 min

1. Click en el servicio **PostgreSQL** que acabas de crear
2. Ve a la pestaña **"Variables"**
3. Busca la variable **DATABASE_URL**
4. Click en el 📋 para copiarla
5. Guárdala en un lugar seguro (la necesitarás)

**Ejemplo de DATABASE_URL:**
```
postgresql://usuario:password@hostname:5432/railway
```

---

### **PASO 5: Configurar Variables de Entorno** ⏱️ 3 min

1. Click en tu servicio **backend** (Node.js)
2. Ve a **Settings** → **Variables**
3. Click **"+ New Variable"**
4. Agrega UNA POR UNA:

```
NODE_ENV = production
DATABASE_URL = (pega la que copiaste en PASO 4)
FRONTEND_URL = https://terrapesca-sistema.up.railway.app
PORT = 3000
TIPO_CAMBIO = 19.50
```

5. Click **"Add"** después de cada una
6. ✅ Variables configuradas

---

### **PASO 6: Trigger Redeploy** ⏱️ 1 min

1. En tu servicio backend, ve a **"Deployments"**
2. Click en los **3 puntos** del último deployment
3. Selecciona **"Redeploy"**
4. Espera 2-3 minutos

---

### **PASO 7: Setup de Base de Datos** ⏱️ 2 min

Ahora debes ejecutar el script de setup.

**OPCIÓN A: Desde Railway Dashboard**
1. Ve a tu servicio backend
2. Click en **"Settings"** → **"Deploy"**
3. En "Build Command", cambia a:
   ```
   npm install && npm run setup
   ```
4. Guarda y redeploy

**OPCIÓN B: Usando Railway CLI** (más rápido)
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Ejecutar setup
railway run npm run setup
```

---

### **PASO 8: Importar Productos** ⏱️ 5 min

El inventario tiene 20,604 productos. Para importarlos:

1. En Railway dashboard, ve a tu backend
2. Click en **"Variables"**
3. Agrega una nueva:
   ```
   RUN_IMPORT = true
   ```
4. Redeploy
5. Espera 5 minutos (importación masiva)
6. Una vez terminado, **ELIMINA** la variable RUN_IMPORT
7. ✅ ¡20,604 productos importados!

---

### **PASO 9: Obtener tu URL** ⏱️ 1 min

1. Ve a tu servicio backend
2. En **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Railway te dará una URL como:
   ```
   https://terrapesca-backend-production-xxxx.up.railway.app
   ```
5. ¡Esa es la URL de tu API!

---

### **PASO 10: Configurar Frontend** ⏱️ 2 min

1. Abre el archivo `frontend/index.html`
2. Busca la línea:
   ```javascript
   const API_URL = 'http://localhost:3000';
   ```
3. Cámbiala por tu URL de Railway:
   ```javascript
   const API_URL = 'https://tu-url.up.railway.app';
   ```
4. Guarda el archivo
5. Sube `index.html` a Netlify (que ya tienes)

---

## ✅ ¡LISTO! VERIFICACIÓN FINAL

Abre tu frontend en Netlify. Deberías poder:

1. ✅ Ver la pantalla de login
2. ✅ Iniciar sesión con Fernanda/Edgar
3. ✅ Ver el dashboard con estadísticas
4. ✅ Ver los 21 empleados
5. ✅ Buscar productos por código
6. ✅ Registrar compras
7. ✅ Generar PDFs

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot connect to database"
**Solución:**
- Verifica que DATABASE_URL esté correcta
- Asegúrate de que PostgreSQL esté corriendo
- Check en Railway logs

### Error: "Products not found"
**Solución:**
- Ejecuta `npm run import-products`
- Verifica que la importación terminó

### Error: "CORS policy"
**Solución:**
- Agrega tu dominio de Netlify a FRONTEND_URL
- Redeploy backend

### Frontend no conecta con backend
**Solución:**
- Verifica que API_URL en frontend.html apunte a Railway
- Abre la consola del navegador (F12) para ver errores

---

## 📊 MONITOREO

En Railway puedes ver:
- 📈 **Metrics**: CPU, RAM, requests
- 📜 **Logs**: Todos los eventos
- 💰 **Usage**: Cuánto has consumido

---

## 💰 COSTOS

Railway ofrece:
- **$5 USD** gratis cada mes
- Después: **$0.000463 por GB-hour**

Para tu sistema (~100MB + 500MB DB):
- Costo estimado: **~$5-7 USD/mes**

---

## 🎉 ¡FELICIDADES!

Tu sistema profesional está:
- ✅ En la nube 24/7
- ✅ Con base de datos real
- ✅ SSL/HTTPS seguro
- ✅ Respaldos automáticos
- ✅ Accesible desde cualquier lugar

---

**¿NECESITAS AYUDA?**
- 📧 Revisa los logs en Railway
- 🐛 Abre un issue en GitHub
- 💬 Consulta la documentación

**CREADO PARA TERRAPESCA 🌊**
