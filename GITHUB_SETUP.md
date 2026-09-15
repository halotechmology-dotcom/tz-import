# 🚀 Guía para Subir TZ Import a GitHub

## Paso 1: Preparar los archivos

Asegúrate de tener estos archivos en tu carpeta raíz:

```
tu-carpeta/
├── index.html
├── styles.css
├── app.js
├── README.md
├── .gitignore
└── img/
    ├── jor-01.jpg
    ├── jor-02.jpg
    ├── dunk-01.jpg
    └── ... (resto de imágenes)
```

## Paso 2: Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz click en **"+"** (arriba a la derecha) → **New repository**
3. Nombra el repositorio: `tz-import`
4. Descripción (opcional): "Tienda online de zapatillas importadas"
5. Elige **Public** (para que sea accesible a todos)
6. **NO** inicialices con README (ya tienes uno)
7. Haz click en **Create repository**

## Paso 3: Configurar Git Localmente

Abre una terminal en tu carpeta y copia-pega estos comandos:

```bash
# Inicializar repositorio local
git init

# Agregar todos los archivos
git add .

# Hacer primer commit
git commit -m "Initial commit: TZ Import e-commerce website"

# Cambiar nombre de rama a main (si es necesario)
git branch -M main

# Agregar URL del repositorio (REEMPLAZA tu-usuario)
git remote add origin https://github.com/tu-usuario/tz-import.git

# Subir a GitHub
git push -u origin main
```

## Paso 4: Activar GitHub Pages

1. En la página de tu repositorio, ve a **Settings**
2. En el menú izquierdo, ve a **Pages**
3. Bajo "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (o main /)
   - Folder: **/ (root)**
4. Haz click en **Save**
5. Espera 1-2 minutos mientras GitHub despliega

## Paso 5: Acceder a tu sitio

Tu sitio estará disponible en:
```
https://tu-usuario.github.io/tz-import
```

Reemplaza `tu-usuario` con tu nombre de usuario de GitHub.

## Actualizar el sitio después

Cada vez que hagas cambios:

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de cambios"

# Subir a GitHub
git push
```

GitHub Pages actualizará automáticamente en 1-2 minutos.

## ✅ Checklist Importante

Antes de hacer push, asegúrate de:

- [ ] Todas las imágenes están en la carpeta `/img`
- [ ] El número de WhatsApp es correcto en `app.js`
- [ ] Los precios y productos son los correctos en `app.js`
- [ ] El archivo `README.md` tiene tu información
- [ ] No hay archivos innecesarios en la carpeta

## 🆘 Solucionar Problemas

### Mi sitio no se ve
- Espera 2-3 minutos después de hacer el cambio en Settings
- Recarga la página (Ctrl+F5 o Cmd+Shift+R para limpiar caché)
- Revisa la sección de errores en Pages → Deployments

### Las imágenes no se cargan
- Verifica que la carpeta `/img` existe
- Comprueba que los nombres de archivo en `app.js` coinciden exactamente
- Las rutas deben ser: `img/jor-01.jpg` (no `/img/jor-01.jpg`)

### WhatsApp no abre
- Asegúrate que el número tiene formato: `5491125076680` (con código de país)
- Prueba desde un teléfono, no desde desktop

## 📝 Comandos Git Útiles

```bash
# Ver historial de cambios
git log --oneline

# Ver cambios sin confirmar
git diff

# Deshacer último commit (no subido)
git reset HEAD~1

# Ver estado actual
git status

# Cambiar mensaje del último commit
git commit --amend -m "Nuevo mensaje"
```

## 🎉 ¡Listo!

Tu sitio ya está en línea. Puedes compartir el link:
```
https://tu-usuario.github.io/tz-import
```

---

**Nota**: Si quieres un dominio personalizado en lugar de GitHub Pages, considera usar:
- **Netlify** (más fácil, hosted gratis)
- **Vercel** (para proyectos React/Next.js)
- Comprar un dominio propio en GoDaddy, Namecheap, etc.
