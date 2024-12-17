import React from "react";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MessageInput = ({ inputText, handleInputChange, handleSend }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.msgInput}
      placeholder="Say something"
      value={inputText}
      onChangeText={handleInputChange}
    />
    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
      <MaterialIcons name="send" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

export default React.memo(MessageInput);

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sendButton: {
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
