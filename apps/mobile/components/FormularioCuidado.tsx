import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export type TipoCuidado = "VACUNA" | "DESPARASITACION" | "REVISION" | "OTRO";

export type ValoresCuidado = {
  tipo: TipoCuidado;
  tipoLibre: string;
  fecha: Date;
  notas: string;
};

const OPCIONES_TIPO: { valor: TipoCuidado; etiqueta: string }[] = [
  { valor: "VACUNA", etiqueta: "Vacuna" },
  { valor: "DESPARASITACION", etiqueta: "Desparasitación" },
  { valor: "REVISION", etiqueta: "Revisión" },
  { valor: "OTRO", etiqueta: "Otro" },
];

type FormularioCuidadoProps = {
  valoresIniciales?: Partial<ValoresCuidado>;
  guardando: boolean;
  erroresCampo?: Record<string, string[] | undefined>;
  onGuardar: (valores: ValoresCuidado) => void;
};

export default function FormularioCuidado({
  valoresIniciales,
  guardando,
  erroresCampo,
  onGuardar,
}: FormularioCuidadoProps) {
  const [tipo, setTipo] = useState<TipoCuidado>(valoresIniciales?.tipo ?? "VACUNA");
  const [tipoLibre, setTipoLibre] = useState(valoresIniciales?.tipoLibre ?? "");
  const [fecha, setFecha] = useState(valoresIniciales?.fecha ?? new Date());
  const [notas, setNotas] = useState(valoresIniciales?.notas ?? "");
  const [mostrarSelectorFecha, setMostrarSelectorFecha] = useState(false);

  return (
    <View style={styles.formulario}>
      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Tipo</Text>
        <View style={styles.opcionesTipo}>
          {OPCIONES_TIPO.map((opcion) => (
            <TouchableOpacity
              key={opcion.valor}
              style={[styles.chip, tipo === opcion.valor && styles.chipSeleccionado]}
              onPress={() => setTipo(opcion.valor)}
            >
              <Text
                style={[
                  styles.chipTexto,
                  tipo === opcion.valor && styles.chipTextoSeleccionado,
                ]}
              >
                {opcion.etiqueta}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {erroresCampo?.tipo ? <Text style={styles.error}>{erroresCampo.tipo[0]}</Text> : null}
      </View>

      {tipo === "OTRO" ? (
        <View style={styles.campo}>
          <Text style={styles.etiqueta}>¿De qué tipo?</Text>
          <TextInput style={styles.input} value={tipoLibre} onChangeText={setTipoLibre} />
          {erroresCampo?.tipoLibre ? (
            <Text style={styles.error}>{erroresCampo.tipoLibre[0]}</Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Fecha</Text>
        <TouchableOpacity
          style={styles.botonFecha}
          onPress={() => setMostrarSelectorFecha(true)}
        >
          <Text>{fecha.toLocaleDateString("es-ES")}</Text>
        </TouchableOpacity>
        {mostrarSelectorFecha ? (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onValueChange={(_evento, seleccionada) => {
              setMostrarSelectorFecha(false);
              if (seleccionada) setFecha(seleccionada);
            }}
            onDismiss={() => setMostrarSelectorFecha(false)}
          />
        ) : null}
        {erroresCampo?.fecha ? <Text style={styles.error}>{erroresCampo.fecha[0]}</Text> : null}
      </View>

      <View style={styles.campo}>
        <Text style={styles.etiqueta}>Notas (opcional)</Text>
        <TextInput
          style={[styles.input, styles.inputNotas]}
          value={notas}
          onChangeText={setNotas}
          multiline
        />
        {erroresCampo?.notas ? <Text style={styles.error}>{erroresCampo.notas[0]}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.botonGuardar, guardando && styles.botonGuardarDeshabilitado]}
        onPress={() => onGuardar({ tipo, tipoLibre, fecha, notas })}
        disabled={guardando}
      >
        <Text style={styles.botonGuardarTexto}>{guardando ? "Guardando…" : "Guardar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 20,
  },
  campo: {
    gap: 8,
  },
  etiqueta: {
    fontWeight: "bold",
  },
  opcionesTipo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSeleccionado: {
    backgroundColor: "#D9A679",
    borderColor: "#D9A679",
  },
  chipTexto: {
    color: "#4E3B2ECC",
  },
  chipTextoSeleccionado: {
    color: "#4E3B2E",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputNotas: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  botonFecha: {
    borderWidth: 1,
    borderColor: "#4E3B2E26",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  error: {
    color: "#B3261E",
    fontSize: 13,
  },
  botonGuardar: {
    backgroundColor: "#A87C5F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  botonGuardarDeshabilitado: {
    opacity: 0.6,
  },
  botonGuardarTexto: {
    color: "#FBF7F0",
    fontWeight: "bold",
  },
});
