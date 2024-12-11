import { TinyEmitter } from "tiny-emitter"

export const RECEIVE_MESSAGE_UI = 'receive_message_ui'
export const CONNECTIONS_UI = 'connections_ui'

const uiEvent = new TinyEmitter()
export default uiEvent
