## Setup

```sh
npm install
```

## Run

To test this chat app, run `npm run ios` or `npm run android` (can run with <= Android 31 emulator or physical device)

Click the Create button to generate a room topic hash.

Copy the hash, then in another terminal use this key as input

```sh
cd terminal
pear run --dev . [topic]
```


```sh
> pear run --dev .
[info] Created new chat room: a1b2c35fbeb452bc900c5a1c00306e52319a3159317312f54fe5a246d634f51a
```


## structure

- [App.js](app/App.js) - entrypoint of React Native UI
- [worklet](app/worklet) - code for bare runtime (via [https://github.com/holepunchto/react-native-bare-kit](react-native-bare-kit))
  - app.cjs - bare code entrypoint, written with Common JS (Node) format
- src/hook/[useWorklet](app/src/hook/useWorklet.js) - react hook to access [https://github.com/holepunchto/react-native-bare-kit](react-native-bare-kit) APIs
- src/lib/rpc - define bare function calls via rpc

## Overview

`App.js` and `src/` host normal React Native code, which will run in UI thread.

Pear/Bare code is run through a separate process (like web worker) called `worklet`.

For common usage:

1. write bare runtime code in `worklet/` and follow the Common JS pattern (Node JS), the entrypoint is `worklet/app.cjs`.
2. To run bare code with the React native UI, we'll bundle codes under `worklet/` by call `./script/bundle_worklet.sh` from root. (which is automatically run with `yarn android` command)

Reference
- [bare-pack](https://www.npmjs.com/package/bare-pack) - Bundle packing for Bare
