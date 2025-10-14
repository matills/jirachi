# 🎯 JIRACHI

**Anything Could Happen** ✨

Una aplicación web moderna y divertida para tomar decisiones aleatorias mediante una ruleta interactiva. Perfecta para elegir entre múltiples opciones cuando no puedes decidirte.

🔗 **[Ver Demo en Vivo](https://jirachi-randomizer.vercel.app/)**

---

## 📋 Características

- **🎨 Interfaz Moderna**: Diseño limpio y atractivo con animaciones fluidas
- **🎡 Ruleta Animada**: Visualización interactiva de las opciones con rotación suave
- **🎊 Efectos de Confetti**: Celebración visual cuando se selecciona un ganador
- **📱 Responsive**: Funciona perfectamente en dispositivos móviles y de escritorio
- **🔗 Compartir Enlaces**: Genera URLs para compartir tus opciones con otros
- **⚡ Rápido y Ligero**: Construido con React y Vite para máximo rendimiento
- **🌈 Colores Vibrantes**: Cada opción tiene su propio color distintivo

---

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación entre páginas
- **Tailwind CSS** - Estilos utility-first
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **TanStack Query** - Manejo de estado asíncrono

---

## 📦 Instalación y Uso Local

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone <tu-repositorio>

# Entrar al directorio
cd jirachi-randomizer

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

---

## 🎮 Cómo Usar

1. **Inicio**: Haz clic en "START" en la página principal
2. **Agregar Opciones**: 
   - Escribe tus opciones en el campo de texto
   - Presiona Enter o el botón "+" para agregar
   - Agrega al menos 2 opciones
3. **Visualizar**: La ruleta se actualiza en tiempo real con tus opciones
4. **Girar**: Haz clic en el botón "GO!" para girar la ruleta
5. **Resultado**: Espera la animación y descubre el ganador
6. **Compartir**: Usa el botón de compartir para generar un enlace con tus opciones

---

## 🔗 Compartir Opciones

Puedes compartir tus opciones mediante URLs. El formato es:
```
https://jirachi-randomizer.vercel.app/options?option=Opción1&option=Opción2
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Confetti.tsx    # Animación de confetti
│   ├── WheelDisplay.tsx # Visualización de la ruleta
│   └── ui/             # Componentes de shadcn/ui
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página de inicio
│   ├── Options.tsx     # Página de opciones
│   ├── Result.tsx      # Página de resultado
│   └── NotFound.tsx    # Página 404
├── hooks/              # Custom hooks
├── lib/                # Utilidades
└── index.css           # Estilos globales
```

---

## 🎨 Paleta de Colores

La aplicación utiliza una paleta de colores vibrante y moderna:
- **Primario**: Turquesa (`hsl(181, 59%, 50%)`)
- **Secundario**: Amarillo suave (`hsl(46, 52%, 74%)`)
- **Ruleta**: 6 colores rotativos incluyendo púrpura, rosa, verde menta y azul

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el proyecto:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

Creado con ❤️ para hacer la toma de decisiones más divertida.

---

## 🌟 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes base
- [Lucide](https://lucide.dev/) por los íconos
- [Vercel](https://vercel.com/) por el hosting

---

**¿No sabes qué elegir? ¡Deja que JIRACHI decida por ti!** 🎲✨