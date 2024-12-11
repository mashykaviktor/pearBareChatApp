import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    padding: 10,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  msgInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#0aa",
    padding: 10,
    borderRadius: 20,
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
});
