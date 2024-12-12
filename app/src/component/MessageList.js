import React, { useRef, useEffect } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const renderMessage = ({ item }) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <View
      style={
        item.local
          ? [styles.message, styles.myMessage]
          : [styles.message, styles.theirMessage]
      }
    >
      <Text style={styles.member}>{item?.memberId ?? "You"}</Text>
      <Text selectable>{item.message}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
};

const MessageList = ({ messages }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <Text style={styles.emptyState}>
          No messages yet. Start the conversation!
        </Text>
      }
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
      })}
      initialNumToRender={20}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
    />
  );
};

export default MessageList;

const styles = StyleSheet.create({
  message: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF",
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  member: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 5,
  },
  emptyState: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#aaa",
    fontStyle: "italic",
  },
});
