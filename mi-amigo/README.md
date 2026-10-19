# mI Amigo · web de prelanzamiento

Página de presentación en español de asistentes de IA por suscripción mensual: Chef, Inglés y Gimnasio/Movimiento. El diseño separa y resalta I y A en la marca. No incluye servicio conversacional ni integración CRV; solo la web solicitada.

## Archivos
- `dist/`: sitio estático publicable, con páginas legales independientes.
- `opencode.json`: un único agente personalizado `mi-amigo-web`, con modelo `opencode/glm-5.3-flash-free`, sin delegación ni permisos de terminal.
- `BRIEF.md`: encargo de implementación.
- `SECURITY.md`: alcance, controles y requisitos para activar ventas.
- `verify.py`: comprobación reproducible de enlaces, CSP, secretos y superficie estática. Ejecutar `python verify.py`, `node --check dist/app.js` y `node verify-selector.cjs` y `python verify-commercial.py`.

OpenCode 1.19.3 se instaló en el entorno de trabajo para ejecutar el agente. No se ha instalado software en el ordenador personal del usuario. El modelo gratuito apareció en `opencode models opencode` y se invocó explícitamente con `--agent mi-amigo-web --model opencode/glm-5.3-flash-free`.

## Publicación
Servir el contenido de `dist/` con HTTPS conservando los archivos y rutas. No requiere npm ni dependencias de ejecución. Los estilos y scripts son locales. Las páginas usan rutas relativas para poder publicarse también en un subdirectorio de GitHub Pages. El conector GitHub disponible permite subir archivos y ramas, pero no crear repositorios ni configurar Pages. El código se conserva en una rama independiente, dentro de `mi-amigo/`, sin sustituir el sitio principal de CARVAJAL. El enlace navegable se publica mediante Sites; no debe confundirse con un despliegue GitHub Pages.

## Estado comercial
Prelanzamiento: sin checkout, registro, cuentas, formulario ni recogida de salud. Precios autorizados: Inglés US$4,99/mes; Gimnasio US$9,99/mes; Chef US$9,99/mes. Binance Pay y QR original de CRV, con nombre visible Cripto Agency Auto. Confirmaciones previstas al +591 62230618; número pendiente de activar. No se inventaron sociedad ni NIT. El correo de CARVAJAL es contacto provisional y abre la aplicación de correo del visitante; no inscribe a nadie ni implica aceptar publicidad.

Antes de vender, completar identidad legal y datos operativos, confirmar total aplicable y derechos de cancelación/reembolso, mapear proveedores y plazos de conservación y revisar los mercados atendidos. Las políticas describen el sitio actual; no autorizan por sí solas futuros tratamientos o cobros. Consultar SECURITY.md.

No se garantiza ausencia de multas, vulnerabilidades o conflictos de marca. No se ha realizado pentest ni auditoría del backend de CRV. La verificación en navegador no está disponible en este entorno bajo el flujo de Sites. No se afirma haberla realizado.

## Actualización comercial y visual · 18 octubre 2026
Se conserva el mismo agente OpenCode mi-amigo-web y el modelo gratuito configurado; instrucciones de actualización en UPDATE-BRIEF.md. El QR original se conserva íntegro y su procedencia/huella se documentan en ASSETS.md. No se enviaron mensajes ni pagos, no se activó el número WhatsApp ni se integró validación automática de pagos. La web distingue la recepción de un comprobante de la validación real por el receptor. El pago mensual previsto es manual, no un débito automático. No se ofrece servicio operativo mientras el canal y las condiciones estén pendientes.

La actualización final de precios/QR/escena fue implementada por el supervisor tras intentos sin entrega del agente gratuito. El render es WebGL procedural propio, con alternativa SVG, control de pausa y respeto a movimiento reducido. La antigua prueba `verify-hero.cjs` fue retirada junto con el motor 3D. La compilación y dos renderizados offline de los shaders se comprobaron con Mesa EGL; no se afirma prueba de navegador.

## Versión actual: HERO estático de ancho completo
El agente mi-amigo-web con GLM-5.3-Flash Free realizó los cambios del HERO en HTML y CSS; el supervisor generó y optimizó las imágenes, ajustó el contraste y retiró los archivos 3D. Se eliminaron hero-3d.js, canvas, shaders, bucles de animación y el recurso SVG anterior. La única funcionalidad JavaScript publicada es el selector local de intereses. Recursos: dist/assets/hero-banner.webp (81.512 bytes, 1774×887) y dist/assets/hero-banner-mobile.webp (22.062 bytes, 960×480). El banner no contiene vídeo, parallax o animaciones. Las medidas de tamaño no son una prueba de rendimiento en dispositivos reales.
La web puede utilizarse como publicación informativa pública. Antes de contratar o cobrar siguen pendientes la identidad legal del operador, las condiciones completas y la activación del canal. No se ha verificado acceso en navegador externo ni la accesibilidad de las páginas desde los sistemas de revisión de Meta.
