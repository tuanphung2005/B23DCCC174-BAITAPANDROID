import { ScrollView, StyleSheet, Text, View } from "react-native";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "Tin tức công nghệ mới nhất",
    date: "24/11/2025",
    content: "Iphone 20 Pro Max ra mắt với nhiều tính năng đột phá...",
  },
  {
    id: "2",
    title: "Cập nhật Android 67",
    date: "23/11/2025",
    content: "Android 67 giới thiệu nhiều cải tiến về hiệu suất và bảo mật...",
  },
  {
    id: "3",
    title: "TypeScript 6.7 Phát hành",
    date: "22/11/2025",
    content: "Các tính năng mới giúp lập trình viên làm việc hiệu quả hơn...",
  },
];

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        {NEWS_DATA.map((news) => (
          <View key={news.id} style={styles.newsCard}>
            <Text style={styles.title}>{news.title}</Text>
            <Text>{news.date}</Text>
            <Text style={styles.contentText}>{news.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentWrapper: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: "white",
    padding: 16,
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
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
