import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";

import { styles } from "./styles";
import { useBackend } from "../../component/BareProvider";
import { createMessage } from "../../lib/message";
import uiEvent, { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from "../../lib/uiEvent";
import MessageInput from "../../component/MessageInput";
import MessageList from "../../component/MessageList";
import {
  getMessages,
  getInputText,
  getPeersCount,
  getRoomTopic,
  getRoomTopicIn,
} from "../../redux/selectors";
import {
  setMessages,
  setInputText,
  setRoomTopic,
  setRoomTopicIn,
  setPeersCount,
} from "../../redux/actions";

export const HomeScreen = () => {
  const backend = useBackend();

  const dispatch = useDispatch();

  const messages = useSelector(getMessages);
  const inputText = useSelector(getInputText);
  const roomTopic = useSelector(getRoomTopic);
  const roomTopicIn = useSelector(getRoomTopicIn);
  const peersCount = useSelector(getPeersCount);

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }) => {
        const newMessage = { ...message, local: false, memberId };
        dispatch(setMessages(newMessage));
      }
    );
    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count) => {
      dispatch(setPeersCount(count));
    });
    return () => {
      messageListener.off();
      peerCountListener.off();
    };
  }, [dispatch]);

  const appendMessage = (msg, local = false) => {
    if (msg.trim()) {
      console.log("Sending message:", msg);
      const newMessage = createMessage(msg, local);
      dispatch(setMessages(newMessage));
    }
  };

  const handleTopic = useCallback((topic) => dispatch(setRoomTopic(topic)), []);

  const handleCreate = useCallback(
    () => backend.createRoom(handleTopic),
    [backend]
  );

  const handleJoin = useCallback(() => {
    console.log("join room with topic:", roomTopicIn);
    const topic = roomTopicIn.replace("Topic: ", "");
    handleTopic(topic);
    backend.joinRoom(topic, handleTopic);
  }, [backend, roomTopicIn]);

  const handleSend = () => {
    if (inputText.trim()) {
      backend.sendMessage(inputText, appendMessage);
      dispatch(setInputText(""));
      Keyboard.dismiss();
    }
  };

  const handleInputChange = (text) => {
    dispatch(setInputText(text));
  };

  const handleRoomTopicInChange = (text) => {
    dispatch(setRoomTopicIn(text));
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg.jpg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {roomTopic ? (
          <View style={styles.innerContainer}>
            <View style={styles.topicContainer}>
              <Text selectable style={styles.topicText}>
                Topic: <Text style={styles.topicHighlight}>{roomTopic}</Text>
              </Text>
              <Text style={styles.peersText}>
                Peers: <Text style={styles.peersCount}>{peersCount}</Text>
              </Text>
            </View>
            <MessageList messages={messages} />
            <MessageInput
              inputText={inputText}
              handleInputChange={handleInputChange}
              handleSend={handleSend}
            />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={[styles.message, styles.sendButton]}
              onPress={handleCreate}
            >
              <Text>Create Room</Text>
            </TouchableOpacity>
            <Text>Or</Text>
            <View style={styles.buttonGroup}>
              <TextInput
                value={roomTopicIn}
                onChangeText={handleRoomTopicInChange}
                style={styles.textInput}
              />
              <TouchableOpacity
                style={[styles.message, styles.sendButton]}
                onPress={handleJoin}
              >
                <Text>Join Room</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Text>
                Open up src/screen/HomeScreen.js to start working on your app!
              </Text>
              <Text>
                FYR lib/rpc and worklet/app.cjs has related backend code.
              </Text>
            </View>
          </View>
        )}
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default HomeScreen;
