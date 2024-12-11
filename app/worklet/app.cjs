/* global Bare, BareKit */
const Hyperswarm = require('hyperswarm')   // Module for P2P networking and connecting peers
const b4a = require('b4a')                 // Module for buffer-to-string and vice-versa conversions
const crypto = require('hypercore-crypto') // Cryptographic functions for generating the key in app

const swarm = new Hyperswarm()

const version = '0.1.0'
console.log('bare version', version)

const getMemberId = (peer) => {
  return peer
    ? b4a.toString(peer.remotePublicKey, 'hex')?.substring(0, 6)
    : 'invalid'
}

const joinSwarm = async (topicBuffer) => {
  // Join the swarm with the topic. Setting both client/server to true means that this app can act as both.
  const discovery = swarm.join(topicBuffer, { client: true, server: true })
  return await discovery.flushed()
}

const createRoom = async () => {
  // Generate a new random topic (32 byte string)
  const topicBuffer = crypto.randomBytes(32)
  // Create a new chat room for the topic
  const done = await joinSwarm(topicBuffer)
  const topic = done ? b4a.toString(topicBuffer, 'hex') : ''
  return { done, topic }
}

const joinRoom = async (topicStr) => {
  try {
    const topicBuffer = b4a.from(topicStr, 'hex')
    const done = await joinSwarm(topicBuffer)
    const topic = done ? b4a.toString(topicBuffer, 'hex') : ''
    return { done, topic }
  } catch (error) {
    return { done: false, topic: 'err' }
  }
}

function createMessage (msg, local = false) {
  return {
    timestamp: new Date(),
    message: msg,
    local,
    type: 'text',
  }
}

function sendMessage (message) {
  // Send the message to all peers (that you are connected to)
  const peers = [...swarm.connections]
  const event = createMessage(message, true)
  for (const peer of peers) peer.write(JSON.stringify(event))
}

const {
  API_PING,
  API_REVERSE,
  API_CREATE_ROOM,
  API_JOIN_ROOM,
  API_SEND_MESSAGE,
  API_RECEIVE_MESSAGE,
  API_UPDATE_CONNECTIONS
} = require('./api2')

Bare
  .on('suspend', () => console.log('suspended'))
  .on('resume', () => console.log('resumed'))
  .on('exit', () => console.log('exited'))

const getTranslation = (text) => text?.split('').reverse().join('')

const rpc = new BareKit.RPC(async (req) => {
  const text = req.data.toString()
  console.warn('BareKit command:', req.command)
  switch(req.command) {
    case API_REVERSE:
      const result = getTranslation(text)
      req.reply(result)
      break
    case API_CREATE_ROOM:
      const { done, topic } = await createRoom()
      req.reply(JSON.stringify({done, topic}))
      break
    case API_JOIN_ROOM:
      const { done: joined, topic: joinTopic } = await joinRoom(text)
      req.reply(JSON.stringify({done: joined, topic: joinTopic}))
      break
    case API_SEND_MESSAGE:
      sendMessage(text)
      req.reply(text)
      break
    case API_PING:
    default:
      console.log('Hello Bare')
      req.reply('Pong from Bare')
  }
})

const receivedMessage = (memberId, event) => {
  const req = rpc.request(API_RECEIVE_MESSAGE)
  console.log(`got message from ${memberId}: ${event} \n`)
  req.send(JSON.stringify({ memberId, event: b4a.toString(event, 'utf8') }))
}

const updatePeersCount = (count) => {
  const req = rpc.request(API_UPDATE_CONNECTIONS)
  req.send(String(count))
}

// When there's a new connection, listen for new messages, and emit them to the UI
swarm.on('connection', (peer) => {
  const memberId = getMemberId(peer)
  console.log(`[info] New peer joined, ${memberId}`)

  peer.on('data', event => {
    // console.log(`peer data ${memberId}`, msg)
    receivedMessage(memberId, event)
  })
  peer.on('error', e => console.error(`Connection error: ${e}`))
})

// When there's updates to the swarm, update the peers count
swarm.on('update', () => {
  console.log(`[info] Number of connections is now ${swarm.connections.size}`)
  updatePeersCount(swarm.connections.size)
})
