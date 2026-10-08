# PearBareChat

A peer-to-peer chat sample spanning React Native mobile clients and a compatible terminal peer, designed to demonstrate direct device-to-device communication without a dedicated application server.

## Overview

The repository contains two compatible chat peers that share the same peer-to-peer transport approach:

- **Mobile peer** (`app/`) — a React Native / Expo application for Android and iOS.
- **Terminal peer** (`terminal/`) — a Pear/Bare runtime CLI application.

Both peers connect directly to each other over a peer-to-peer network. There is no additional backend or application server involved in message delivery — any peer that creates or joins the same room key can exchange messages with any other peer running either implementation.

## Architecture

On the mobile side, the chat logic is split across two execution contexts that communicate over an explicit RPC boundary:

```
React Native UI (app/src, App.js)
        |  RPC calls (app/src/lib/rpc.js)
        v
Bare worklet runtime (app/worklet, via react-native-bare-kit)
        |  Hyperswarm + Hypercore crypto
        v
P2P transport (direct peer connections)
```

- The React Native UI thread never talks to the network directly. It calls into the worklet through a request/reply RPC layer defined in `app/src/lib/rpc.js` (UI-side handlers) and `app/worklet/api.mjs` / `app/worklet/api2.cjs` (shared API command names).
- The worklet (`app/worklet/app.cjs`) runs inside a separate Bare runtime instance, managed by [`react-native-bare-kit`](https://github.com/holepunchto/react-native-bare-kit). This is where the actual peer-to-peer logic lives: it creates a `Hyperswarm` instance, joins/creates rooms by topic, and uses `hypercore-crypto` to generate the random topic key for a new room.
- The worklet is bundled separately from the React Native JS bundle (see `app/script/bundle_worklet.sh`, using `bare-pack`) and loaded by the UI through `useWorklet` (`app/src/hook/useWorklet.js`) and `BareProvider` (`app/src/component/BareProvider.js`).

The terminal peer (`terminal/index.js` and `terminal/chat-core.js`) is a second, independent implementation of the same peer logic, running directly under the Pear/Bare runtime instead of inside a React Native worklet. It uses the same `Hyperswarm` + `hypercore-crypto` approach to create or join a room and exchange messages, which is what makes it protocol-compatible with the mobile peer — both sides join the same swarm topic and write/read JSON-encoded chat messages over the resulting peer connections.

## Why It Is Interesting

This project is a focused exploration of a few specific engineering concepts rather than a full product:

- **Peer-to-peer communication** using Hyperswarm/Hypercore-based discovery and connection — no application server mediates messages between peers.
- **Cross-runtime communication inside React Native**: the UI thread and a separate Bare "worklet" runtime run side by side, bridged by an explicit RPC request/reply protocol instead of implicit shared state.
- **An explicit RPC boundary** (`app/src/lib/rpc.js` ↔ `app/worklet/api.mjs`/`api2.cjs`) with a shared, versioned set of command constants used by both sides.
- **A mobile + terminal peer model**: the same transport logic is implemented twice (once embedded in a React Native worklet, once as a standalone Bare/Pear CLI), and both can interoperate in the same chat room.

Hyperswarm, Hypercore, Bare, and Pear are third-party runtimes/libraries from the Holepunch ecosystem — this project uses them to build the sample, it does not implement or own that underlying networking stack.

## Repository Structure

```
app/                    React Native mobile peer (Expo)
  App.js                App entrypoint
  src/component/        UI components (BareProvider, MessageList, MessageInput, ...)
  src/hook/useWorklet.js React hook that boots the Bare worklet and its RPC channel
  src/lib/rpc.js         UI-side RPC request handlers / dispatch
  src/redux/             Redux store, actions, reducer, selectors
  worklet/               Bare runtime code (app.cjs entrypoint, api.mjs/api2.cjs, bundled app.bundle.js)
  script/bundle_worklet.sh  Bundles worklet/ into app.bundle.js via bare-pack

terminal/               Terminal peer (Pear/Bare runtime)
  index.js               CLI entrypoint (argument handling, readline UI)
  chat-core.js            Hyperswarm/Hypercore room + messaging logic
```

## Stack

**Mobile (`app/`)**
- React Native 0.76, React 18, Expo ~52
- `react-native-bare-kit` — runs the Bare worklet from within React Native
- `hyperswarm`, `hypercore-crypto` — peer discovery/connection and topic key generation
- `redux`, `react-redux` — application state management
- `b4a`, `tiny-emitter`, `events` — buffer/string conversion and event handling utilities
- `bare-pack` (dev dependency) — bundles the worklet code

**Terminal (`terminal/`)**
- Pear/Bare runtime (`pear-interface`, `bare-process`, `bare-readline`, `bare-tty`)
- `hyperswarm`, `hypercore-crypto` — same P2P transport as the mobile peer
- `b4a`
- `brittle` (dev dependency) — test runner declared for this package

## Running the Mobile App

From `app/`:

```sh
npm install
npm run start     # expo start
npm run android   # bundles the worklet, then expo run:android
npm run ios       # bundles the worklet, then expo run:ios
npm run web       # expo start --web
npm run bundle    # runs script/bundle_worklet.sh directly
```

`npm run android` and `npm run ios` both run `npm run bundle` first, which invokes `script/bundle_worklet.sh` to pack `worklet/app.cjs` into `worklet/app.bundle.js` via `bare-pack` before the native build runs. There is no root-level `package.json` — all mobile commands are run from inside `app/`.

In the app, use the Create action to generate a new room topic, or enter an existing topic to join a room created by another peer (mobile or terminal).

## Running the Terminal Peer

From `terminal/` (requires the Pear runtime: `npm i -g pear`):

```sh
npm install
npm run dev   # pear run -d .
npm test      # brittle test/*.test.js
```

Argument handling, from `terminal/index.js`:
- Running `pear run -d .` with no trailing argument has no room key, so the process creates a new room and prints the generated topic key to the terminal.
- Running `pear run -d . <topic>` passes `<topic>` as the last CLI argument; the process reads it as an existing room key and joins that room instead of creating a new one.
- Once connected, new peer connections and incoming/outgoing chat messages are logged directly to the terminal via a `bare-readline` prompt.

## Testing

`terminal/package.json` declares a `test` script (`brittle test/*.test.js`) using the [`brittle`](https://www.npmjs.com/package/brittle) test runner as a dev dependency. No test files are currently present under `terminal/` in this snapshot, so this should be read as the test tooling that is wired up rather than an existing, populated test suite.

The mobile app (`app/`) does not include any automated test setup or test files.

## Technical Notes

- This is a technical sample / architectural exploration, not a production application — it has no deployment, monitoring, or commercial usage history.
- Dependency versions (React Native 0.76, Expo ~52, Hyperswarm 4.8.4, etc.) reflect the point in time the sample was built and have not been kept continuously up to date.
- The project intentionally avoids a dedicated application server for peer communication — all chat traffic flows directly between peers over Hyperswarm connections.
- No guarantees are made about encryption, security hardening, or production-grade reliability of the peer-to-peer transport; it uses the Hyperswarm/Hypercore stack as provided by its maintainers.
