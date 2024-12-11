## Mobile Development Project challenge

### Overview

This challenge evaluates your practical mobile development skills through enhancing a peer-to-peer chat application. You'll have **up to 4 hours** to implement specific improvements while maintaining the existing functionality.

### Project structure

- `/app` - Mobile chat App (your primary focus)
- `/terminal` - Command-line chat App (for testing)

Key Feature: The application uses direct peer-to-peer communication without requiring a central server.

### Demo

Watch the current implementation: https://youtube.com/shorts/E0G-WBHTltU

### Project Tasks

The zip contain a working sample, your mission is to improve the existing mobile chat App (in the `app/` directory) by implementing the following enhancements:

- Refactor the message handling logic using Redux store
- Implement efficient list scrolling to handle thousands of messages
- Improve message display formatting to match modern messaging apps (reference design: https://keet.io/)
- Enhance overall project readability, user experience and performance

### Setup Instructions

1. Initial Setup

Extract the project archive

```sh
cd app
npm install
```

2. Run the App

Use npm

```
npm run ios
```

Use xcode

- navigate to the `ios/` directory (auto gen by the `npm run ios` command)
- open the `.xcworkspace` file
- Build and run the project

3. Testing with Multiple Instances

You need at least one of these combinations:

- 2 mobile app instances
- 1 mobile app + 1 terminal client

4. Terminal Client Setup (Optional)

Visit `terminal/README.md` to run terminal chat room.
Copy the topic hash from the console that running react native.

```sh
> npm install -g pear
> pear run --dev . [topic hash]
[info] Joined chat room...
```

### Development Tips

#### Debugging

- iOS, Run `npm start` and then run the project with xcode to view logs.
- Android, use `npm run barelog` for logcat monitoring.

#### Important Notes

- Focus on improving the chat interface and message handling
- Core functionality in `app/worklet` or `app/src/lib/rpc` could remain unchanged

#### Submission Guidelines

- Make your improvements within the 4-hour timeframe
- Commit all changes to local git repository
- Create a zip archive of your work
- Send the archive to the recruiter

### Evaluation Criteria

- Code quality and organization
- Implementation of required features
- Performance optimizations
- UI/UX improvements
- Time management
