import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useSession } from "../../../../../lib/auth-context";
import FormularioCuidado, {
  type TipoCuidado,
  type ValoresCuidado,
} from "../../../../../components/FormularioCuidado";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function EditarCuidado() {
  // tipo/tipoLibre/fecha/notas llegan como parámetros de navegación desde la
  // fila de cuidado en la pantalla de detalle (ya están en memoria ahí), en
  // vez de pedirlos otra vez a la API solo para precargar el formulario.
  const { id, cuidadoId, tipo, tipoLibre, fecha, notas } = useLocalSearchParams<{
    id: string;
    cuidadoId: string;
    tipo: string;
    tipoLibre: string;
    fecha: string;
    notas: string;
  }>();
  const router = useRouter();
  const { session } = useSession();
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresCampo, setErroresCampo] = useState<Record<string, string[] | undefined>>();

  const guardar = async (valores: ValoresCuidado) => {
    if (!session || !id || !cuidadoId) return;
    setGuardando(true);
    setError(null);
    setErroresCampo(undefined);

    try {
      const response = await fetch(`${API_URL}/api/perros/${id}/cuidados/${cuidadoId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: valores.tipo,
          tipoLibre: valores.tipo === "OTRO" ? valores.tipoLibre : "",
          fecha: valores.fecha.toISOString(),
          notas: valores.notas,
        }),
      });

      if (response.status === 400) {
        const data = (await response.json()) as { errors: Record<string, string[] | undefined> };
        setErroresCampo(data.errors);
        return;
      }

      if (!response.ok) {
        throw new Error("La API no ha respondido correctamente.");
      }

      router.back();
    } catch {
      setError("No se ha podido guardar el cuidado. Comprueba tu conexión.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volver}>‹ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar cuidado</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FormularioCuidado
        valoresIniciales={{
          tipo: tipo as TipoCuidado,
          tipoLibre: tipoLibre ?? "",
          fecha: fecha ? new Date(fecha) : new Date(),
          notas: notas ?? "",
        }}
        guardando={guardando}
        erroresCampo={erroresCampo}
        onGuardar={guardar}
      />
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
});
