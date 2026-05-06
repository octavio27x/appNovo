import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const [selected, setSelected] = useState<string>("");

  // 🔹 gerar horários
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    let hour = 7;
    let minute = 30;

    while (hour < 21 || (hour === 21 && minute <= 30)) {
      slots.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );

      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    return slots;
  };

  const rooms = Array.from({ length: 8 }, (_, i) => `Sala ${i + 1}`);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📅 Agenda de Consultas</Text>

        {/* 🔹 Calendário */}
        <Calendar
          onDayPress={(day: any) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: "#007AFF",
            },
          }}
        />

        {selected !== "" && (
          <Text style={styles.selectedText}>
            Dia escolhido: {selected}
          </Text>
        )}

        {/* 🔹 SALAS + HORÁRIOS */}
        <ScrollView style={styles.roomsContainer}>
          {rooms.map((room) => (
            <View key={room} style={styles.roomCard}>
              <Text style={styles.roomTitle}>{room}</Text>

              <View style={styles.timeGrid}>
                {generateTimeSlots().map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={styles.timeButton}
                    onPress={() => {
                      // 🔹 depois você navega pra outra tela aqui
                      alert(`${room} - ${time}`);
                    }}
                  >
                    <Text style={styles.timeText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 🔻 BARRA INFERIOR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.icon}>🏠</Text>
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.label}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.icon}>🧑</Text>
          <Text style={styles.label}>Paciente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  content: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  selectedText: {
    marginTop: 10,
    textAlign: "center",
  },

  roomsContainer: {
    marginTop: 10,
  },

  roomCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  roomTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  timeButton: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
    margin: 2,
  },

  timeText: {
    fontSize: 12,
  },

  bottomBar: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  navButton: {
    alignItems: "center",
  },

  icon: {
    fontSize: 22,
  },

  label: {
    fontSize: 12,
  },
});