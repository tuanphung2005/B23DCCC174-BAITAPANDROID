import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = "46f85ebae7add0e2f7be9e01b9551c48";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    main: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function Index() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchWeather = async () => {
    if (!city.trim()) {
      console.log("nhap ten thanh pho");
      return;
    }

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=vi`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Không tìm thấy thành phố");
        } else if (response.status === 401) {
          throw new Error("API key không hợp lệ");
        } else {
          throw new Error("Không thể lấy dữ liệu thời tiết");
        }
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên thành phố"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchWeather}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Tìm kiếm
            </Text>
          </TouchableOpacity>
        </View>

        {weatherData && !loading && (
          <View style={styles.weatherContainer}>
            <View style={styles.locationContainer}>
              <Text style={styles.cityName}>
                {weatherData.name}, {weatherData.sys.country}
              </Text>
              <Text style={styles.weatherMain}>
                {weatherData.weather[0].main}
              </Text>
            </View>

            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>
                {Math.round(weatherData.main.temp)}°C
              </Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Độ ẩm</Text>
                <Text style={styles.detailValue}>
                  {weatherData.main.humidity}%
                </Text>
              </View>

              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Cảm giác như</Text>
                <Text style={styles.detailValue}>
                  {Math.round(weatherData.main.feels_like)}°C
                </Text>
              </View>

              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Gió</Text>
                <Text style={styles.detailValue}>
                  {weatherData.wind.speed} m/s
                </Text>
              </View>

              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Min / Max</Text>
                <Text style={styles.detailValue}>
                  {Math.round(weatherData.main.temp_min)}° /{" "}
                  {Math.round(weatherData.main.temp_max)}°
                </Text>
              </View>
            </View>
          </View>
        )}

        {!weatherData && (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Nhập tên thành phố
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  weatherContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  weatherMain: {
    fontSize: 18,
    color: "#666",
  },
  tempContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 20,
    color: "#666",
    textTransform: "capitalize",
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  instructionContainer: {
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
