#!/bin/bash

echo "🚀 TZ IMPORT - Deployer a GitHub Pages"
echo "=========================================="
echo ""

# Pedir usuario de GitHub
read -p "¿Cuál es tu usuario de GitHub? (ej: rafarios): " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
  echo "❌ Error: Debes ingresar tu usuario de GitHub"
  exit 1
fi

REPO_URL="https://github.com/$GITHUB_USER/tz-import.git"

echo ""
echo "📝 Configurando Git..."
git init
git add .
git commit -m "TZ Import - Tienda de zapatillas importadas

- HTML, CSS, JavaScript completamente funcional
- Catálogo con 50+ modelos
- Carrito persistente
- Integración WhatsApp
- Responsive design

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git branch -M main
git remote add origin "$REPO_URL"

echo ""
echo "📤 Subiendo a GitHub..."
git push -u origin main

echo ""
echo "✅ ¡Listo!"
echo ""
echo "Tu sitio estará disponible en:"
echo "🌐 https://$GITHUB_USER.github.io/tz-import"
echo ""
echo "⏳ Espera 2-3 minutos mientras GitHub despliega"
echo ""
echo "Pasos finales:"
echo "1. Ve a https://github.com/$GITHUB_USER/tz-import"
echo "2. Settings → Pages"
echo "3. Deploy from branch: main, / (root)"
echo "4. ¡Listo!"

