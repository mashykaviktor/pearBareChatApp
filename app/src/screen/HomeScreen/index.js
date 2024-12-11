import { useState, useCallback, useEffect } from'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { useBackend } from '../../component/BareProvider'
import { createMessage } from '../../lib/message'
import uiEvent, { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from '../../lib/uiEvent'

export const HomeScreen = () => {
  const backend = useBackend()

  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [roomTopic, setRoomTopic] = useState('')
  const [roomTopicIn, setRoomTopicIn] = useState('')
  const [peersCount, setPeersCount] = useState(0)

  useEffect(() => {
    const messageListener = uiEvent.on(RECEIVE_MESSAGE_UI, ({ memberId, message}) => {
      setMessages(messages => [...messages, { ...message, local: false, memberId }])
    })
    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count) => {
      setPeersCount(count)
    })
    return () => {
      messageListener.off()
      peerCountListener.off()
    }
  }, [])

  const appendMessage = (msg, local = false) => {
    if (msg.trim()) {
      // console.log('Sending message:', msg)
      setMessages(messages => [...messages, createMessage(msg, local)])
    }
  }

  const handleTopic = useCallback(topic => setRoomTopic(topic), [])

  const handleCreate = useCallback(() => backend.createRoom(handleTopic), [backend])

  const handleJoin = useCallback(() => {
    console.log('join room with topic:', roomTopicIn)
    const topic = roomTopicIn.replace('Topic: ', '')
    handleTopic(topic)
    backend.joinRoom(topic, handleTopic)
  }, [backend, roomTopicIn])

  const handleSend = () => {
    if (inputText.trim()) {
      backend.sendMessage(inputText, appendMessage)
      setInputText('');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
      {roomTopic ? (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.messageList}>
              <Text selectable>Topic: {roomTopic}</Text>
              <Text>Peers: {peersCount}</Text>
              {messages && messages.map((event, idx) => (
                <View key={idx} style={event.local ? [styles.message, styles.myMessage] : styles.message}>
                  <Text style={styles.member}>{event?.memberId ?? 'You'}</Text>
                  <Text selectable>{event.message}</Text>
                </View>)
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.msgInput}
            placeholder="Say something"
            value={inputText}
            onChangeText={setInputText} />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} >
            <MaterialIcons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </>
      ) : (
      <View style={styles.innerContainer}>
        <View style={styles.info}>
          <Text>Open up src/screen/HomeScreen.js to start working on your app!</Text>
          <Text>FYR lib/rpc and worklet/app.cjs has related backend code.</Text>
        </View>
        <TouchableOpacity style={[styles.message, styles.sendButton]} onPress={handleCreate}>
          <Text>Create Room</Text>
        </TouchableOpacity>
        <Text>
          Or
        </Text>
        <View style={styles.buttonGroup}>
          <TextInput value={roomTopicIn} onChangeText={setRoomTopicIn} style={styles.textInput} />
          <TouchableOpacity style={[styles.message, styles.sendButton]} onPress={handleJoin}>
            <Text>Join Room</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#AAA',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  msgInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#0aa',
    padding: 10,
    borderRadius: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    gap: 8
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  info: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
    gap: 8,
  },
})

export default HomeScreen
