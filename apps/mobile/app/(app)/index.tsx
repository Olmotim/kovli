import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";

import { useSession } from "../../lib/auth-context";
import { supabase } from "../../lib/supabase";

type Perro = {
  id: string;
  nombre: string;
  raza: string;
  fotoUrl: string | null;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MisPerros() {
  const { session } = useSession();
  const [perros, setPerros] = useState<Perro[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cargarPerros = useCallback(async () => {
    if (!session) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/perros`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error("La API no ha respondido correctamente.");
      }

      const data = (await response.json()) as { perros: Perro[] };
      setPerros(data.perros);
    } catch {
      setError("No se han podido cargar los perros. Comprueba tu conexión.");
    }
  }, [session]);

  useEffect(() => {
    cargarPerros();
  }, [cargarPerros]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis perros</Text>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text style={styles.logout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {perros === null && !error ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={perros ?? []}
          keyExtractor={(perro) => perro.id}
          ListEmptyComponent={
            error ? null : <Text>Todavía no tienes ningún perro registrado.</Text>
          }
          renderItem={({ item }) => (
            <Link href={{ pathname: "/perros/[id]", params: { id: item.id } }} asChild>
              <TouchableOpacity style={styles.perroRow}>
                {item.fotoUrl ? (
                  <Image source={{ uri: item.fotoUrl }} style={styles.foto} />
                ) : (
                  <View style={styles.fotoVacia} />
                )}
                <View>
                  <Text style={styles.perroNombre}>{item.nombre}</Text>
                  <Text>{item.raza}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logout: {
    color: "#A87C5F",
  },
  error: {
    color: "#B3261E",
  },
  loading: {
    marginTop: 24,
  },
  perroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  fotoVacia: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8DCC8",
  },
  perroNombre: {
    fontWeight: "bold",
  },
});
