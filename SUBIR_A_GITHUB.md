# 📤 SUBIR CÓDIGO A GITHUB - PASO A PASO

## ✅ YA TIENES:
- Repositorio creado: https://github.com/Gared1981/terrapesca-sistema
- Todo el código descargado en tu computadora

---

## 🎯 MÉTODO 1: SUBIDA POR INTERFAZ WEB (MÁS FÁCIL - 5 MIN)

### **PASO 1: Descomprimir el código**
1. Descarga el archivo: `terrapesca-sistema-completo.zip`
2. Haz clic derecho → Extraer aquí
3. Tendrás una carpeta: `terrapesca-sistema/`

### **PASO 2: Ir a tu repositorio**
1. Ve a: https://github.com/Gared1981/terrapesca-sistema
2. Verás una página que dice "Quick setup"

### **PASO 3: Subir archivos**
1. Click en: **"uploading an existing file"**
2. Arrastra TODA la carpeta `terrapesca-sistema/` 
3. O click "choose your files" y selecciona TODO
4. Espera a que suban (puede tomar 2-3 minutos)
5. En "Commit changes" escribe: `Initial commit - Sistema completo`
6. Click: **"Commit changes"**

### ✅ ¡LISTO! Código en GitHub

---

## 🎯 MÉTODO 2: SUBIDA POR TERMINAL (PARA DESARROLLADORES - 2 MIN)

### Si tienes Git instalado:

```bash
# 1. Ir a la carpeta del código
cd ruta/a/terrapesca-sistema

# 2. Inicializar git
git init

# 3. Agregar todos los archivos
git add .

# 4. Hacer commit
git commit -m "Initial commit - Sistema completo"

# 5. Agregar el repositorio remoto
git remote add origin https://github.com/Gared1981/terrapesca-sistema.git

# 6. Subir el código
git branch -M main
git push -u origin main
```

### Si te pide usuario y contraseña:
- **Usuario:** Gared1981
- **Contraseña:** Tu Personal Access Token de GitHub
  - Si no lo tienes: https://github.com/settings/tokens

---

## 📋 VERIFICAR QUE TODO SUBIÓ BIEN

Ve a: https://github.com/Gared1981/terrapesca-sistema

Deberías ver:
```
terrapesca-sistema/
├── backend/
├── frontend/
├── database/
├── README.md
├── railway.json
├── .gitignore
└── .env.example
```

---

## ⚡ SIGUIENTE PASO: CONECTAR CON RAILWAY

Una vez que el código esté en GitHub, me avisas y te guío para:
1. Conectar Railway con el repo
2. Agregar PostgreSQL
3. Configurar variables
4. Deploy automático
5. ✅ Sistema funcionando en 10 minutos

---

## 🐛 PROBLEMAS COMUNES:

### "The file is too large"
**Solución:** Usa el Método 2 (Terminal) o sube las carpetas por separado

### "Authentication failed"
**Solución:** Necesitas crear un Personal Access Token:
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Marca: repo (todos los permisos)
4. Usa ese token como contraseña

### "Permission denied"
**Solución:** Verifica que estás logueado como Gared1981

---

**¿Listo para subir el código?** 

Dime qué método usarás (Web o Terminal) y te sigo guiando 🚀
