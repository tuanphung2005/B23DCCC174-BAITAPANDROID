import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";

export default function Index() {
  const [inputSeconds, setInputSeconds] = useState("60");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const parsedSeconds = Number.parseInt(inputSeconds, 10);
  const isValidSeconds = Number.isFinite(parsedSeconds) && parsedSeconds > 0;

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStart = () => {
    if (!isValidSeconds) {
      return;
    }
    Keyboard.dismiss();
    clearTimer();
    setSecondsLeft(parsedSeconds);
    setStatus("running");
  };

  const handleReset = () => {
    clearTimer();
    setSecondsLeft(null);
    setStatus("idle");
  };

  useEffect(() => {
    if (status !== "running") {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) {
          return null;
        }
        if (prev <= 1) {
          clearTimer();
          setStatus("done");
          Vibration.vibrate(800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [status]);

  useEffect(() => () => clearTimer(), []);

  const displayValue =
    secondsLeft !== null ? secondsLeft.toString().padStart(2, "0") : "--";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 80,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
          gap: 16,
        }}
      >
        <Text style={{ color: "#8ea6d9", fontSize: 14 }}>
          Nhập số giây cần đếm
        </Text>

        <TextInput
          value={inputSeconds}
          onChangeText={(text) => setInputSeconds(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          placeholder="Ví dụ: 90"
          placeholderTextColor="#4d5f80"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 20,
            borderColor: "#4e7bff",
            borderWidth: 1,
          }}
        />

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={handleStart}
            disabled={!isValidSeconds || status === "running"}
            style={{
              flex: 1,
              backgroundColor:
                !isValidSeconds || status === "running" ? "#fff" : "#4e7bff",
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
              Start
            </Text>
          </Pressable>

          <Pressable
            onPress={handleReset}
            style={{
              width: 80,
              borderRadius: 8,
              borderColor: "#4e7bff",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#4e7bff", fontWeight: "600" }}>Reset</Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingVertical: 32,
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Text style={{ color: "#8ea6d9", fontSize: 16, marginBottom: 8 }}>
            Thời gian còn lại
          </Text>
          <Text style={{ color: "#000", fontSize: 56, fontVariant: ["tabular-nums"] }}>
            {displayValue}
          </Text>
          {status === "done" && (
            <Text style={{ color: "#ff9e9e", fontSize: 18, marginTop: 12 }}>
              Het gio
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
