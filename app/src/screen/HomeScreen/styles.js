import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 48,
    justifyContent: "center",
  },
  messageList: {
    paddingVertical: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#AAA",
  },
  buttonGroup: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  info: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    gap: 8,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  myMessageBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#D1E7DD",
  },
  theirMessageBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F8D7DA",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 5,
  },

  topicContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  topicText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  topicHighlight: {
    color: "#007AFF",
    fontWeight: "semibold",
  },
  peersText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  peersCount: {
    color: "#28A745",
    fontWeight: "bold",
  },
});
