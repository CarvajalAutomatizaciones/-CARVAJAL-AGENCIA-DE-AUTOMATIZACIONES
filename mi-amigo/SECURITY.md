# mI Amigo — alcance de seguridad y lanzamiento

Fecha: 18 de octubre de 2026. Sitio de prelanzamiento; no es una aplicación de asistentes, ni una auditoría del servicio CRV. Agente de implementación: mi-amigo-web, OpenCode 1.19.3, opencode/glm-5.3-flash-free. No se accede a producción de CARVAJAL.

## Diseño y límites
Sitio estático sin cuentas, panel administrativo, pagos, formularios, base de datos o claves API. No recopila peso, fotografías, dieta, diagnósticos ni conversaciones. La integración con CRV V1.2.5 STARTER y WhatsApp queda fuera de esta entrega y no se presenta como activada. El selector de intereses funciona localmente y no debe persistir datos.

No se puede garantizar ausencia absoluta de vulnerabilidades ni multas. Una revisión estática no es pentest, revisión del host o dictamen jurídico. Las protecciones de autenticación, control de acceso, RLS, webhooks, prompt injection y manejo de herramientas deben auditarse cuando exista backend.

## Controles a verificar en cada publicación
- Enlaces internos existentes y fragmentos válidos, títulos/lang/viewport y navegación por teclado.
- Sin dependencias de ejecución ni fuentes, scripts, imágenes o vídeos de terceros.
- Sin secretos, handlers inline, scripts inline, eval, inserción HTML dinámica, fetch ni almacenamiento del navegador.
- CSP por documento con scripts/estilos propios y sin conexiones, objetos o formularios. frame-ancestors debe ser encabezado HTTP; no se garantiza protección de framing desde meta.
- HTTPS y encabezados reales de la plataforma deben comprobarse tras publicar. Un archivo _headers es solo propuesta para hosts compatibles, no prueba de que el host lo aplique. GitHub Pages no permite definir todos los encabezados personalizados. La CSP meta no protege respuestas ajenas a estos HTML.
- Sin checkout ficticio, renovación oculta, reseñas inventadas ni promesas de resultados de salud.

## Antes de aceptar suscripciones
1. Confirmar titular legal, domicilio de notificaciones, identificación fiscal, país de establecimiento, correo propio y mercados atendidos; revisión de marca mI Amigo.
2. Publicar precio, moneda, impuestos, límites, fecha de primer cobro, renovación, cancelación, reembolsos y derechos obligatorios por mercado. Verificar cobro y devolución reales antes de habilitar venta.
3. Identificar responsables/encargados, contratos, proveedores IA/WhatsApp/CRV, transferencias internacionales, retención por categoría, eliminación y respuesta de incidentes; no inventar garantías de no entrenamiento.
4. Activar consentimiento separado para marketing y cualquier tratamiento sensible, si llegara a ser necesario, sin imponerlo para consultar esta web. Revisar necesidad/proporcionalidad; no inferir salud o capacidad por forma del cuerpo. Empezar con personas adultas.
5. Evaluar legalmente la oferta deportiva/alimentaria y los países donde se comercializará. No sustituir atención sanitaria ni formular dietas terapéuticas. Aplicar límites también al asistente real, no solo a la web.
6. Si se añaden Meta Pixel, analítica, vídeos o cookies opcionales: bloquearlos hasta consentimiento, ofrecer rechazo al mismo nivel y retirada, actualizar política y volver a probar.
7. Al conectar backend: secretos solo en servidor, autorización por usuario/tenant en cada consulta, validación de entrada, rate limits, CSRF según sesiones, firma y deduplicación de webhooks, uso restringido de herramientas IA, monitorización con datos mínimos y pruebas de separación de clientes.

## Propiedad intelectual
Textos y gráficos deben ser creados para el proyecto; sin extracción de plantillas, fotos, vídeos o conversaciones. Se usan fuentes del sistema sin redistribuir archivos tipográficos. No se afirma que un contenido esté libre de derechos por estar en Internet. Debe verificarse la disponibilidad comercial de la marca antes del lanzamiento.

## Fuentes de referencia consultadas (no se copian sus diseños ni textos)
- OWASP Top 10 2025: https://top10.owasp.org/2025/
- Ley boliviana 453, texto en WIPO Lex: https://www.wipo.int/wipolex/es/legislation/details/14916
- AGETIC, protección de datos en Bolivia: https://www.agetic.gob.bo/estudios-investigaciones/
- UE, privacidad y cookies: https://europa.eu/youreurope/business/growing/digitalising/online-privacy/index_en.htm
- UE, contratos de consumo: https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-contracts/index_en.htm
Estas referencias orientan el análisis; no certifican cumplimiento ni sustituyen determinar la normativa aplicable y su vigencia para cada mercado.

## Resultado de revisión de esta entrega
- 8 documentos HTML y 133 enlaces/recursos verificados: 0 fallos.
- Sintaxis JavaScript válida; selector probado en sus tres opciones, selección única y valor desconocido.
- Se retiró el JavaScript inicial del agente por error de sintaxis y lógica de precios no autorizada. También se corrigieron afirmaciones inventadas, erratas y la composición de la marca en la portada.
- Se corrigieron tokens de color: coral sobre blanco y texto secundario sobre crema superan 4.5:1; esto no equivale a certificar accesibilidad WCAG completa.
- Sin credenciales detectadas por el escaneo heurístico ni recursos externos en el contenido publicado. Sin fuentes descargadas ni fotos, vídeos o conversaciones.
- La revisión en navegador, el comportamiento visual real en dispositivos y los encabezados efectivos de la plataforma no han sido verificados mediante navegador. No se ha realizado pentest.
