"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { type Map as LeafletMap, type Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Organizacion } from "@/data/organizaciones";

// Icono propio en vez del marcador por defecto de Leaflet: sus imágenes
// (marker-icon.png...) se referencian con una ruta relativa que se rompe
// con el empaquetador de Next.js. Un SVG en línea evita el problema de raíz.
function pinIcon(activo: boolean) {
  const color = activo ? "#4E3B2E" : "#D9A679";
  return L.divIcon({
    className: "",
    html: `
      <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z"
          fill="${color}" stroke="#4E3B2E" stroke-width="1.5"
        />
        <circle cx="15" cy="15" r="5.5" fill="#FBF7F0" />
      </svg>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  });
}

interface OrganizacionesMapaProps {
  organizaciones: Organizacion[];
  seleccionada: string | null;
  onSeleccionar: (nombre: string) => void;
}

export default function OrganizacionesMapa({
  organizaciones,
  seleccionada,
  onSeleccionar,
}: OrganizacionesMapaProps) {
  // El ref de MapContainer no se rellena en el mismo commit que el resto
  // de refs de React (react-leaflet crea el mapa de forma algo diferida) —
  // un useRef normal se quedaría leyendo `null` en un efecto que ya se
  // ejecutó. Con estado, en cambio, el propio cambio de `map` dispara de
  // nuevo los efectos que dependen de él. Patrón recomendado en la
  // documentación de react-leaflet.
  const [map, setMap] = useState<LeafletMap | null>(null);
  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});

  // Ajusta el encuadre a todos los marcadores visibles al montar (o al
  // cambiar de pestaña de país, que remonta este componente vía `key`).
  // Un centro/zoom fijos no sirven aquí: el punto medio entre España y
  // Argentina cae en mitad del Atlántico, así que un `zoom` fijo o bien
  // se queda muy alejado (solo océano) o corta países fuera de la vista.
  useEffect(() => {
    if (!map || organizaciones.length === 0) return;
    const bounds = L.latLngBounds(organizaciones.map((o): [number, number] => [o.lat, o.lng]));
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 11 });
  }, [map, organizaciones]);

  useEffect(() => {
    if (!map || !seleccionada) return;
    const organizacion = organizaciones.find((o) => o.nombre === seleccionada);
    const marker = markerRefs.current[seleccionada];
    if (!organizacion || !marker) return;
    map.flyTo([organizacion.lat, organizacion.lng], 11, { duration: 0.6 });
    marker.openPopup();
  }, [map, seleccionada, organizaciones]);

  // Centro/zoom iniciales: solo se ven un instante, `fitBounds` los
  // corrige nada más montar. Punto neutro por si `organizaciones` llegara
  // vacío (no ocurre con los datos actuales, pero evita indexar fuera).
  const centroInicial: [number, number] =
    organizaciones.length > 0 ? [organizaciones[0].lat, organizaciones[0].lng] : [20, -20];

  return (
    <MapContainer
      center={centroInicial}
      zoom={5}
      ref={setMap}
      scrollWheelZoom={false}
      className="h-full w-full min-h-80 rounded-sm"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {organizaciones.map((organizacion) => (
        <Marker
          key={organizacion.nombre}
          position={[organizacion.lat, organizacion.lng]}
          icon={pinIcon(organizacion.nombre === seleccionada)}
          eventHandlers={{ click: () => onSeleccionar(organizacion.nombre) }}
          ref={(marker) => {
            markerRefs.current[organizacion.nombre] = marker;
            // Leaflet marca el icono con role="button" para el teclado, pero no
            // le da nombre accesible por sí solo (el SVG interno es decorativo).
            marker?.getElement()?.setAttribute("aria-label", `Ver ${organizacion.nombre} en el mapa`);
          }}
        >
          <Popup>
            <span className="font-serif font-bold text-chocolate">{organizacion.nombre}</span>
            <br />
            {organizacion.ciudad}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
