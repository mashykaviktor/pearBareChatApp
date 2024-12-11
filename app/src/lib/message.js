export function createMessage (msg, local = false) {
  return {
    timestamp: new Date(),
    message: msg,
    local,
    type: 'text',
  }
}
