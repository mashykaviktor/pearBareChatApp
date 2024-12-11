export const setMessages = (value) => {
  return {
    type: "messages/setMessages",
    payload: value,
  };
};

export const setInputText = (value) => {
  return {
    type: "inputText/setInputText",
    payload: value,
  };
};
export const setRoomTopic = (value) => {
  return {
    type: "roomTopic/setRoomTopic",
    payload: value,
  };
};

export const setRoomTopicIn = (value) => {
  return {
    type: "roomTopicIn/setRoomTopicIn",
    payload: value,
  };
};

export const setPeersCount = (value) => {
  return {
    type: "peersCount/setPeersCount",
    payload: value,
  };
};
