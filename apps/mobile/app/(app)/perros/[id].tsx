import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { useSession } from "../../../lib/auth-context";

type EstadoCuidado = "vencido" | "proximo" | "lejano";

type Cuidado = {
  id: string;
  tipo: string;
  tipoLibre: string | null;
  fecha: string;
  notas: string | null;
  estado: EstadoCuidado;
};

type DetallePerro = {
  perro: { id: string; nombre: string };
  proximos: Cuidado[];
  historial: Cuidado[];
};

type Tarea = {
  id: string;
  nombre: string;
  hecha: boolean;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Mismas etiquetas que apps/web/lib/cuidados.ts (etiquetaTipoCuidado) — se
// repite aquí en vez de compartirse porque son solo textos de interfaz,
// no lógica de negocio (eso sí vive en packages/domain).
const ETIQUETAS_TIPO: Record<string, string> = {
  VACUNA: "Vacuna",
  DESPARASITACION: "Desparasitación",
  REVISION: "Revisión veterinaria",
  OTRO: "Otro",
};

function etiquetaTipoCuidado(cuidado: Pick<Cuidado, "tipo" | "tipoLibre">): string {
  if (cuidado.tipo === "OTRO" && cuidado.tipoLibre) return cuidado.tipoLibre;
  return ETIQUETAS_TIPO[cuidado.tipo] ?? cuidado.tipo;
}

// Mismos colores por estado que ESTILOS_ESTADO en FilaCuidado.tsx (web).
const ESTILOS_ESTADO: Record<EstadoCuidado, { borderColor: string; backgroundColor: string }> = {
  vencido: { borderColor: "#B3261E4D", backgroundColor: "#FDEDEC" },
  proximo: { borderColor: "#D9A679", backgroundColor: "#D9A6791A" },
  lejano: { borderColor: "#4E3B2E26", backgroundColor: "#FBF7F0" },
};

function FilaCuidado({ cuidado }: { cuidado: Cuidado }) {
  const fecha = new Date(cuidado.fecha).toLocaleDateString("es-ES");

  return (
    <View style={[styles.filaCuidado, ESTILOS_ESTADO[cuidado.estado]]}>
      <View style={styles.filaCuidadoTexto}>
        <Text style={styles.filaCuidadoTipo}>{etiquetaTipoCuidado(cuidado)}</Text>
        {cuidado.notas ? <Text style={styles.filaCuidadoNotas}>{cuidado.notas}</Text> : null}
      </View>
      <Text style={styles.filaCuidadoFecha}>{fecha}</Text>
    </View>
  );
}

function FilaTarea({
  tarea,
  pendiente,
  onPress,
}: {
  tarea: Tarea;
  pendiente: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.filaTarea} onPress={onPress} disabled={pendiente}>
      <Text style={styles.filaTareaCheck}>{tarea.hecha ? "☑" : "☐"}</Text>
      <Text style={[styles.filaTareaNombre, tarea.hecha && styles.filaTareaHecha]}>
        {tarea.nombre}
      </Text>
    </TouchableOpacity>
  );
}

export default function DetallePerro() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { session } = useSession();
  const [detalle, setDetalle] = useState<DetallePerro | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rutinas, setRutinas] = useState<Tarea[] | null>(null);
  const [errorRutinas, setErrorRutinas] = useState<string | null>(null);
  const [pendientes, setPendientes] = useState<Set<string>>(new Set());

  const cargarDetalle = useCallback(async () => {
    if (!session || !id) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/perros/${id}/cuidados`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error("La API no ha respondido correctamente.");
      }

      const data = (await response.json()) as DetallePerro;
      setDetalle(data);
    } catch {
      setError("No se han podido cargar los cuidados. Comprueba tu conexión.");
    }
  }, [session, id]);

  const cargarRutinas = useCallback(async () => {
    if (!session || !id) return;
    setErrorRutinas(null);

    try {
      const response = await fetch(`${API_URL}/api/perros/${id}/rutinas`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error("La API no ha respondido correctamente.");
      }

      const data = (await response.json()) as { tareas: Tarea[] };
      setRutinas(data.tareas);
    } catch {
      setErrorRutinas("No se han podido cargar las rutinas. Comprueba tu conexión.");
    }
  }, [session, id]);

  useEffect(() => {
    cargarDetalle();
    cargarRutinas();
  }, [cargarDetalle, cargarRutinas]);

  const marcarRutina = useCallback(
    async (tareaId: string) => {
      if (!session || !id) return;

      setPendientes((anteriores) => new Set(anteriores).add(tareaId));

      try {
        const response = await fetch(`${API_URL}/api/perros/${id}/rutinas/${tareaId}/marcar`, {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (!response.ok) {
          throw new Error("La API no ha respondido correctamente.");
        }

        const data = (await response.json()) as { hecha: boolean };
        setRutinas(
          (actuales) =>
            actuales?.map((tarea) =>
              tarea.id === tareaId ? { ...tarea, hecha: data.hecha } : tarea,
            ) ?? actuales,
        );
      } catch {
        setErrorRutinas("No se ha podido actualizar la rutina. Comprueba tu conexión.");
      } finally {
        setPendientes((anteriores) => {
          const nuevas = new Set(anteriores);
          nuevas.delete(tareaId);
          return nuevas;
        });
      }
    },
    [session, id],
  );

  const sinCuidados =
    detalle !== null && detalle.proximos.length === 0 && detalle.historial.length === 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>‹ Mis perros</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{detalle?.perro.nombre ?? ""}</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {detalle === null && !error ? <ActivityIndicator style={styles.loading} /> : null}

      {sinCuidados ? <Text>Sin cuidados registrados todavía.</Text> : null}

      {detalle && detalle.proximos.length > 0 ? (
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Próximos</Text>
          {detalle.proximos.map((cuidado) => (
            <FilaCuidado key={cuidado.id} cuidado={cuidado} />
          ))}
        </View>
      ) : null}

      {detalle && detalle.historial.length > 0 ? (
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Historial</Text>
          {detalle.historial.map((cuidado) => (
            <FilaCuidado key={cuidado.id} cuidado={cuidado} />
          ))}
        </View>
      ) : null}

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>Rutinas de hoy</Text>

        {errorRutinas ? <Text style={styles.error}>{errorRutinas}</Text> : null}

        {rutinas === null && !errorRutinas ? (
          <ActivityIndicator style={styles.loading} />
        ) : null}

        {rutinas && rutinas.length === 0 ? <Text>Sin rutinas para hoy.</Text> : null}

        {rutinas?.map((tarea) => (
          <FilaTarea
            key={tarea.id}
            tarea={tarea}
            pendiente={pendientes.has(tarea.id)}
            onPress={() => marcarRutina(tarea.id)}
          />
        ))}
      </View>

      <Link href={{ pathname: "/perros/[id]/diario", params: { id: id ?? "" } }} asChild>
        <TouchableOpacity style={styles.enlaceDiario}>
          <Text style={styles.enlaceDiarioTexto}>Diario ›</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenido: {
    padding: 24,
    gap: 16,
  },
  header: {
    gap: 4,
  },
  volver: {
    color: "#A87C5F",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  error: {
    color: "#B3261E",
  },
  loading: {
    marginTop: 24,
  },
  seccion: {
    gap: 8,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filaCuidado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filaCuidadoTexto: {
    flexShrink: 1,
  },
  filaCuidadoTipo: {
    fontWeight: "bold",
  },
  filaCuidadoNotas: {
    color: "#4E3B2EB3",
    fontSize: 13,
  },
  filaCuidadoFecha: {
    color: "#4E3B2EB3",
    fontSize: 13,
  },
  filaTarea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filaTareaCheck: {
    fontSize: 18,
    color: "#A87C5F",
  },
  filaTareaNombre: {
    flexShrink: 1,
  },
  filaTareaHecha: {
    color: "#4E3B2EB3",
    textDecorationLine: "line-through",
  },
  enlaceDiario: {
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  enlaceDiarioTexto: {
    fontWeight: "bold",
    color: "#A87C5F",
  },
});
