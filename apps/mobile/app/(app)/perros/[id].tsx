import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

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

export default function DetallePerro() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { session } = useSession();
  const [detalle, setDetalle] = useState<DetallePerro | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    cargarDetalle();
  }, [cargarDetalle]);

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

      {detalle === null && !error ? (
        <ActivityIndicator style={styles.loading} />
      ) : null}

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
});
