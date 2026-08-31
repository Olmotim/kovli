import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useSession } from "../../../../lib/auth-context";

type EntradaDiario = {
  id: string;
  fecha: string;
  texto: string | null;
  etiquetas: string[];
  fotos: string[];
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function FilaEntradaDiario({ entrada }: { entrada: EntradaDiario }) {
  const fecha = new Date(entrada.fecha).toLocaleDateString("es-ES");

  return (
    <View style={styles.filaEntrada}>
      <Text style={styles.filaEntradaFecha}>{fecha}</Text>

      {entrada.texto ? <Text style={styles.filaEntradaTexto}>{entrada.texto}</Text> : null}

      {entrada.etiquetas.length > 0 ? (
        <View style={styles.etiquetas}>
          {entrada.etiquetas.map((etiqueta) => (
            <Text key={etiqueta} style={styles.etiqueta}>
              {etiqueta}
            </Text>
          ))}
        </View>
      ) : null}

      {entrada.fotos.length > 0 ? (
        <ScrollView horizontal style={styles.fotos}>
          {entrada.fotos.map((url) => (
            <Image key={url} source={{ uri: url }} style={styles.foto} />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

export default function DiarioPerro() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { session } = useSession();
  const [entradas, setEntradas] = useState<EntradaDiario[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cargarEntradas = useCallback(async () => {
    if (!session || !id) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/perros/${id}/diario`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error("La API no ha respondido correctamente.");
      }

      const data = (await response.json()) as { entradas: EntradaDiario[] };
      setEntradas(data.entradas);
    } catch {
      setError("No se ha podido cargar el diario. Comprueba tu conexión.");
    }
  }, [session, id]);

  useEffect(() => {
    cargarEntradas();
  }, [cargarEntradas]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>‹ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Diario</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {entradas === null && !error ? <ActivityIndicator style={styles.loading} /> : null}

      {entradas && entradas.length === 0 ? (
        <Text>Todavía no hay entradas de diario.</Text>
      ) : null}

      {entradas?.map((entrada) => (
        <FilaEntradaDiario key={entrada.id} entrada={entrada} />
      ))}
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
  filaEntrada: {
    gap: 8,
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 8,
    padding: 16,
  },
  filaEntradaFecha: {
    fontWeight: "bold",
  },
  filaEntradaTexto: {
    color: "#4E3B2ECC",
  },
  etiquetas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  etiqueta: {
    backgroundColor: "#4E3B2E1A",
    color: "#4E3B2ECC",
    fontSize: 12,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  fotos: {
    flexDirection: "row",
  },
  foto: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginRight: 8,
  },
});
