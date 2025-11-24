import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixid=extra",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1763661665960-f4aaf7c81519",
  "https://images.unsplash.com/photo-1763661665960-f4aaf7c81519",
  "https://images.unsplash.com/photo-1763661582858-f88094b11c63",
  "https://images.unsplash.com/photo-1763013373779-19e259f95b41",
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const GRID_PADDING = 16;
const GRID_GAP = 8;
const SWIPE_THRESHOLD = 80;

export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const imageSize = useMemo(() => {
    const totalGap = GRID_GAP * 2;
    return (SCREEN_WIDTH - GRID_PADDING * 2 - totalGap) / 3;
  }, []);

  const showImage = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const goToOffset = (offset: number) => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      const next = prev + offset;
      if (next < 0 || next >= IMAGE_URLS.length) return prev;
      
      return next;
    });
  };

  const handleDetectedSwipe = (direction: "left" | "right") => {
    // console.log(
    //   `[SwipeDetector] ${direction.toUpperCase()} swipe detected at ${new Date().toLocaleTimeString()}`
    // );
    goToOffset(direction === "left" ? 1 : -1);
  };

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = 0;
  }, [selectedIndex, translateX]);

  const swipeGesture = Gesture.Pan()
    .onChange(({ changeX }) => {
      translateX.value += changeX;
    })
    .onEnd(({ velocityX }) => {
      if (translateX.value > SWIPE_THRESHOLD || velocityX > 800) {
        runOnJS(handleDetectedSwipe)("right");
      } else if (translateX.value < -SWIPE_THRESHOLD || velocityX < -800) {
        runOnJS(handleDetectedSwipe)("left");
      }
    })
    .onFinalize(() => {
      translateX.value = withSpring(0, { damping: 15, stiffness: 120 });
    });

  const modalBodyStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={IMAGE_URLS}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              styles.thumbnailWrapper,
              { width: imageSize, height: imageSize, marginBottom: GRID_GAP },
            ]}
            onPress={() => showImage(index)}
          >
            <Image source={{ uri: `${item}?auto=format&fit=crop&w=500&q=60` }} style={styles.thumbnail} />
          </Pressable>
        )}
      />

      <Modal visible={selectedIndex !== null} transparent animationType="fade">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={swipeGesture}>
            <View style={styles.modalBackdrop}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalCounter}>
              {selectedIndex !== null ? selectedIndex + 1 : 0}/{IMAGE_URLS.length}
            </Text>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeText}>Đóng</Text>
            </Pressable>
          </View>

            <Animated.View style={[styles.modalBody, modalBodyStyle]}>
              {selectedIndex !== null && (
                <Image
                  source={{ uri: `${IMAGE_URLS[selectedIndex]}?auto=format&fit=crop&w=1200&q=80` }}
                  style={styles.fullImage}
                />
              )}
            </Animated.View>

          <View style={styles.modalFooter}>
            <Text style={styles.tipText}>Vuốt sang trái/phải để đổi ảnh</Text>
          </View>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: GRID_PADDING,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  thumbnailWrapper: {
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 48,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalCounter: {
    color: "#fff",
    fontSize: 16,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalFooter: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  debugText: {
    color: "#0ff",
    marginBottom: 4,
    fontSize: 12,
  },
  tipText: {
    color: "#ccc",
  },
});
