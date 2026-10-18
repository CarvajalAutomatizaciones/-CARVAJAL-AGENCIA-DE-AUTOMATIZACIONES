# mI Amigo · web de prelanzamiento

Página de presentación en español de asistentes de IA por suscripción mensual: Chef, Inglés y Gimnasio/Movimiento. El diseño separa y resalta I y A en la marca. No incluye servicio conversacional ni integración CRV; solo la web solicitada.

## Archivos
- `dist/`: sitio estático publicable, con páginas legales independientes.
- `opencode.json`: un único agente personalizado `mi-amigo-web`, con modelo `opencode/glm-5.3-flash-free`, sin delegación ni permisos de terminal.
- `BRIEF.md`: encargo de implementación.
- `SECURITY.md`: alcance, controles y requisitos para activar ventas.
- `verify.py`: comprobación reproducible de enlaces, CSP, secretos y superficie estática. Ejecutar `python verify.py`, `node --check dist/app.js` y `node verify-selector.cjs`.

OpenCode 1.19.3 se instaló en el entorno de trabajo para ejecutar el agente. No se ha instalado software en el ordenador personal del usuario. El modelo gratuito apareció en `opencode models opencode` y se invocó explícitamente con `--agent mi-amigo-web --model opencode/glm-5.3-flash-free`.

## Publicación
Servir el contenido de `dist/` con HTTPS conservando los archivos y rutas. No requiere npm ni dependencias de ejecución. Los estilos y scripts son locales. Las páginas usan rutas relativas para poder publicarse también en un subdirectorio de GitHub Pages. El conector GitHub disponible permite subir archivos y ramas, pero no crear repositorios ni configurar Pages. El código se conserva en una rama independiente, dentro de `mi-amigo/`, sin sustituir el sitio principal de CARVAJAL. El enlace navegable se publica mediante Sites; no debe confundirse con un despliegue GitHub Pages.

## Estado comercial
Prelanzamiento: sin checkout, registro, cuentas, formulario ni recogida de salud. No se inventaron precios, sociedad, NIT o número WhatsApp. El correo de CARVAJAL es contacto provisional y abre la aplicación de correo del visitante; no inscribe a nadie ni implica aceptar publicidad.

Antes de vender, completar identidad legal y datos operativos, confirmar precios y derechos de cancelación/reembolso, mapear proveedores y plazos de conservación y revisar los mercados atendidos. Las políticas describen el sitio actual; no autorizan por sí solas futuros tratamientos o cobros. Consultar SECURITY.md.

No se garantiza ausencia de multas, vulnerabilidades o conflictos de marca. No se ha realizado pentest ni auditoría del backend de CRV. La verificación en navegador no está disponible en este entorno bajo el flujo de Sites. No se afirma haberla realizado.
