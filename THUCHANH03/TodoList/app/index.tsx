import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "@todo-list";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Todo[] = JSON.parse(stored);
          setTodos(parsed);
        }
      } catch (error) {
        console.error("Failed to load todos", error);
        Alert.alert("Lỗi", "Không thể tải danh sách công việc");
      } finally {
        hasLoaded.current = true;
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;

    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error("Failed to persist todos", error);
        Alert.alert("Lỗi", "Không thể lưu dữ liệu công việc");
      }
    };
    persist();
  }, [todos]);

  const handleSubmit = useCallback(() => {
    const title = input.trim();
    if (!title) return;

    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, title } : todo,
        ),
      );
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title,
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prev) => [newTodo, ...prev]);
    }

    setInput("");
  }, [editingId, input]);

  const handleToggle = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInput("");
    }
  }, [editingId]);

  const startEditing = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setInput(todo.title);
  }, []);

  const orderedTodos = useMemo(() => {
    return [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [todos]);

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoRow}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxDone]}
        onPress={() => handleToggle(item.id)}
        accessibilityRole="button"
        accessibilityLabel={item.completed ? "Đánh dấu chưa xong" : "Đánh dấu hoàn thành"}
      >
        {item.completed && (
          <Ionicons name="checkmark" size={18} color="#000" />
        )}
      </TouchableOpacity>
      <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>
        {item.title}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEditing(item)}>
          <Ionicons name="pencil" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={16}
      >
        <View style={styles.container}>
          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              style={styles.input}
              placeholder={editingId ? "Cập nhật tên công việc" : "Thêm công việc mới"}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitLabel}>{editingId ? "Lưu" : "Thêm"}</Text>
            </TouchableOpacity>
          </View>

          {orderedTodos.length ? (
            <FlatList
              data={orderedTodos}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-done" size={48} color="#94a3b8" />
              <Text style={styles.emptyText}>Chưa có công việc nào</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  submitLabel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
    gap: 12,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    gap: 12,
    borderWidth: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDone: {
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  todoTextDone: {
    textDecorationLine: "line-through",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
  },
});
