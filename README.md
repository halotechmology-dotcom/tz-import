# TZ IMPORT - Tienda de Zapatillas Importadas

Página web de e-commerce para venta de zapatillas importadas de marcas premium (Jordan, Nike, Adidas, Vans, New Balance, Puma, CAT).

## 📁 Estructura del Proyecto

```
tz-import/
├── index.html          # HTML principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica JavaScript
├── README.md          # Este archivo
└── img/               # Carpeta de imágenes
    ├── jor-01.jpg
    ├── dunk-01.jpg
    ├── sam-01.jpg
    └── ... (resto de imágenes)
```

## 🚀 Características

- ✅ Catálogo de 50+ modelos de zapatillas
- ✅ Filtro por marca
- ✅ Búsqueda en tiempo real
- ✅ Carrito persistente (localStorage)
- ✅ Compartir carrito por URL
- ✅ Integración WhatsApp para pedidos
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Dark mode nativo
- ✅ Animaciones suaves

## 📋 Requisitos

Solo necesitas un navegador web moderno. No hay dependencias externas.

## 💻 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tz-import.git
cd tz-import
```

2. Abre `index.html` en tu navegador favorito

3. (Opcional) Usa un servidor local para desarrollo:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Con Live Server (VS Code extension)
# Abre con Live Server
```

Luego accede a `http://localhost:8000` o el puerto que indique tu servidor.

## 🖼️ Imágenes Necesarias

Crea una carpeta `img/` en la raíz del proyecto y coloca las imágenes con estos nombres:

- `jor-01.jpg` - Air Jordan 1 High OG
- `jor-02.jpg` - Air Jordan 4 Retro Bred
- `jor-03.jpg` - Air Jordan 4 Retro Fire Red
- `jor-04.jpg` - Air Jordan 4 Retro Sail/Rosa
- `dunk-01.jpg` - Nike Dunk Low Panda
- `dunk-02.jpg` - Nike Dunk Low University Blue
- ... (ver app.js para la lista completa)

## 📝 Personalización

### Cambiar datos de productos

Edita el array `RAW` en `app.js`:

```javascript
const RAW = `SKU|Nombre|Color|Precio|Categoría|Premium|Talles|
JOR-01|Air Jordan 1 High OG|negro charol|209999|Jordan|1|
...`;
```

Formato: `SKU|Nombre|Color|Precio|Categoría|Premium|Talles`

### Cambiar número de WhatsApp

En `app.js`, busca:
```javascript
const PHONE = '5491125076680';
```

Reemplaza con tu número (con código de país).

### Personalizar estilos

Edita `styles.css` directamente. Variables principales:
- Colores de marca en la paleta CSS
- Animaciones en `@keyframes`
- Tipografía (Anton, Space Grotesk, JetBrains Mono)

## 🌐 Desplegar en GitHub Pages

1. Crea un repositorio en GitHub llamado `tz-import`

2. Sube los archivos:
```bash
git init
git add .
git commit -m "Initial commit: TZ Import website"
git branch -M main
git remote add origin https://github.com/tu-usuario/tz-import.git
git push -u origin main
```

3. En GitHub, ve a Settings → Pages
4. Selecciona "Deploy from a branch"
5. Elige rama `main` y carpeta `/ (root)`
6. ¡Listo! Tu sitio estará en `https://tu-usuario.github.io/tz-import`

## 📱 Características de Carrito

- **Persistencia Local**: El carrito se guarda automáticamente en localStorage
- **Compartir por URL**: Genera un link con el carrito precompletado
  - Formato: `index.html#c=SKU1:cant1,SKU2:cant2`
  - Ejemplo: `?#c=JOR-01:2,DUNK-01:1`

## 🔗 Integración WhatsApp

El sistema genera automáticamente mensajes con:
- Detalles de cada producto (nombre, color, SKU, precio)
- Total estimado
- Link del carrito guardado

Los links WhatsApp usan el formato:
```
https://wa.me/{PHONE}?text={mensaje_codificado}
```

## 🛠️ Stack Técnico

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive, animaciones, variables CSS
- **Vanilla JavaScript** - Sin frameworks (puro ES6)
- **LocalStorage** - Persistencia del carrito
- **Google Fonts** - Tipografía

## 📊 Navegadores Soportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)

## 📄 Licencia

MIT - Siéntete libre de usar, modificar y distribuir este proyecto.

## 📧 Contacto

Para soporte, contacta por WhatsApp: +54 9 11 2507-6680

---

Hecho con ❤️ para TZ IMPORT
