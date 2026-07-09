# 007 · Mapa interactivo del directorio de organizaciones

**Estado:** hecho

## Qué hace

Añade una vista de mapa al directorio de organizaciones de la home (feature 006), sincronizada con la lista ya existente:

- **Escritorio:** lista y mapa lado a lado (split view), los dos visibles a la vez.
- **Móvil:** apilados en vertical — mapa arriba, lista debajo (no caben lado a lado).
- Un marcador por organización, en las coordenadas de su ciudad (aproximadas — no se pide dirección exacta).
- El mapa respeta la pestaña de país activa ("Todos" / "España" / "Argentina"): muestra solo los marcadores de las organizaciones visibles en ese momento en la lista.
- Clic en una fila de la lista resalta/centra su marcador en el mapa.
- Clic en un marcador resalta la fila correspondiente en la lista.

## Por qué

Anotado como visión a futuro por el usuario durante la feature 006 (ver `spec/features/006-organizaciones-ayuda-adopcion/spec.md`, "Fuera de alcance"), y dejado como v2 tras validar el directorio simple. Ayuda a ubicar de un vistazo dónde está cada organización, algo que una lista de texto no transmite bien.

## Criterios de aceptación

- [x] El mapa usa Leaflet + OpenStreetMap (sin API key ni coste) — dependencia nueva aprobada por el usuario para esta feature.
- [x] Escritorio: lista y mapa en split view (lado a lado). Móvil: mapa arriba, lista debajo.
- [x] Un marcador por organización, con las coordenadas de su ciudad geocodificadas una vez y guardadas como dato estático (no se geocodifica en tiempo real).
- [x] El mapa se filtra igual que la lista: con una pestaña de país activa, solo muestra los marcadores de ese país; con "Todos", los de las dos.
- [x] Clic en una fila resalta/centra su marcador (por ejemplo, abriendo su popup o cambiando su estilo).
- [x] Clic en un marcador resalta la fila correspondiente en la lista.
- [x] El mapa se carga solo en el cliente (Leaflet necesita `window`/DOM, no funciona en el render de servidor).
- [x] Responsive y sin romper el resto de la sección "Organizaciones" ya existente.
- [x] `pnpm build` y `pnpm lint` sin errores nuevos; verificado con Playwright (desktop y móvil) — pendiente de tu confirmación en el navegador.

## Fuera de alcance

- Coordenadas exactas por dirección — solo a nivel de ciudad.
- Clustering de marcadores (con 8 organizaciones no hace falta agrupar visualmente).
- Añadir más países o más organizaciones — eso ya se cerró en la 006, esta feature es solo la vista de mapa sobre los datos ya existentes.
- Geocodificación en tiempo real o backend propio — las coordenadas son un dato estático más en `organizaciones.ts`, igual que el resto de campos.
