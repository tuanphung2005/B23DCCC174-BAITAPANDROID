import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Student = {
  id: string;
  name: string;
  age: number;
  className: string;
};

const STUDENTS: Student[] = [
  { id: "1", name: "Nguyen Van A", age: 20, className: "CNTT1" },
  { id: "2", name: "Tran Thi B", age: 19, className: "CNTT1" },
  { id: "3", name: "Le Van C", age: 21, className: "CNTT2" },
  { id: "4", name: "Hoang Thi D", age: 20, className: "CNTT2" },
  { id: "5", name: "Pham Van E", age: 19, className: "CNTT3" },
  { id: "6", name: "Do Thi F", age: 22, className: "CNTT3" },
  { id: "7", name: "Vu Van G", age: 20, className: "CNTT4" },
  { id: "8", name: "Dang Thi H", age: 21, className: "CNTT4" },
  { id: "9", name: "Bui Van I", age: 20, className: "CNTT5" },
  { id: "10", name: "Phan Thi K", age: 19, className: "CNTT5" },
  { id: "11", name: "Dinh Van L", age: 22, className: "CNTT6" },
  { id: "12", name: "Ngo Thi M", age: 21, className: "CNTT6" },
  { id: "13", name: "Ta Van N", age: 20, className: "CNTT7" },
  { id: "14", name: "Ly Thi O", age: 19, className: "CNTT7" },
  { id: "15", name: "Ha Van P", age: 23, className: "CNTT8" },
  { id: "16", name: "Mai Thi Q", age: 20, className: "CNTT8" },
  { id: "17", name: "Kieu Van R", age: 21, className: "CNTT9" },
  { id: "18", name: "La Thi S", age: 22, className: "CNTT9" },
  { id: "19", name: "Chu Van T", age: 19, className: "CNTT10" },
  { id: "20", name: "Nghiem Thi U", age: 20, className: "CNTT10" },
];

export default function Index() {
  const handlePress = (name: string) => {
    Alert.alert("Sinh viên", name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách sinh viên</Text>
      <FlatList
        data={STUDENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.name)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>Tuổi: {item.age}</Text>
            <Text style={styles.meta}>Lớp: {item.className}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  meta: {
    fontSize: 16,
    color: "#555",
  },
});
