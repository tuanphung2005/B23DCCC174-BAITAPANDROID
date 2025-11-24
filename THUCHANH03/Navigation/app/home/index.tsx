import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Item {
  id: string;
  title: string;
  description: string;
}

const DATA: Item[] = [
  { id: "1", title: "Mục 1", description: "muc 1" },
  { id: "2", title: "Mục 2", description: "muc 2" },
  { id: "3", title: "Mục 3", description: "muc 3" },
  { id: "4", title: "Mục 4", description: "muc 4" },
  { id: "5", title: "Mục 5", description: "muc 5" },
  { id: "6", title: "Mục 6", description: "muc 6" },
  { id: "7", title: "Mục 7", description: "muc 7" },
  { id: "8", title: "Mục 8", description: "muc 8" },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: "/home/detail",
          params: {
            id: item.id,
            title: item.title,
            description: item.description,
          },
        })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>Nhấn để xem chi tiết</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 16,
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});
