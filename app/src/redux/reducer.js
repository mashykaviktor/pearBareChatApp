const initialState = {
  messages: [],
  inputText: "",
  roomTopic: "",
  roomTopicIn: "",
  peersCount: 0,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "messages/setMessages": {
      const updatedMessages = Array.isArray(action.payload)
        ? [...state.messages, ...action.payload]
        : [...state.messages, action.payload];

      return {
        ...state,
        messages: updatedMessages,
      };
    }
    case "inputText/setInputText": {
      return {
        ...state,
        inputText: action.payload,
      };
    }
    case "roomTopic/setRoomTopic": {
      return {
        ...state,
        roomTopic: action.payload,
      };
    }
    case "roomTopicIn/setRoomTopicIn": {
      return {
        ...state,
        roomTopicIn: action.payload,
      };
    }
    case "peersCount/setPeersCount": {
      return {
        ...state,
        peersCount: action.payload,
      };
    }
    default:
      return state;
  }
};
