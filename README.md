# PearBareChat
Interoperatable peer-to-peer Chat sample across mobile devices (Android & iOS) & terminal

A sample chat App that consists of:
- A mobile chat peer (located in the `app/` directory)
- A compatible terminal chat peer (located in the `terminal/` directory) that can be use as test peer(s)

Both Apps are peer-to-peer ready. App & App can communicate with each other without running extra server.

FYR Inside of React Native we have UI thread and bare-kit (can think as backend) thread that communicate with RPC (remote procedure call).
- `app/worklet` contain most of `backend` code run inside of the react native
- `app/src/lib/rpc` contain the UI part handler
