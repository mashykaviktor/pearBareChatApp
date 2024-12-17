import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const NotificationCard = ({ children, onClose, isVisible }) => {
  const translateX = useRef(new Animated.Value(300)).current; // Start off-screen to the right
  const { width: screenWidth } = useWindowDimensions();
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : screenWidth, // 0 = visible, 300 = off-screen right
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={[styles.topicContainer, { transform: [{ translateX }] }]}
    >
      {children}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={16} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(NotificationCard);

const styles = StyleSheet.create({
  topicContainer: {
    padding: 15,
    paddingRight: 48,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  closeButton: {
    top: 8,
    right: 8,
    position: "absolute",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0aa",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
