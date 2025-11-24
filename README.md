# Noon E-Commerce Mobile App

A modern React Native e-commerce application featuring smart search with LFU caching, optimized cart management, and seamless shopping experience. Built with TypeScript, Redux Toolkit, and Clean Architecture principles for performance and maintainability.

---

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Redux Persist** - Persistent caching for cart and search
- **React Navigation** - Screen routing and navigation
- **React Native Vector Icons** - Ionicons icon library
- **Custom LFU Cache** - Least Frequently Used cache implementation for search optimization

---

## Clean Architecture

This application follows **Clean Architecture** principles with clear separation of concerns across distinct layers:

### Presentation Layer
Handles all UI components and screens. Responsible for rendering the user interface, capturing user interactions, and displaying data. Components are optimized with React.memo for performance.

### Business Logic Layer
Contains custom hooks that encapsulate all business logic, state management, and side effects. Provides clean interfaces to the presentation layer without exposing implementation details.

### Domain Layer
Pure business logic and data operations. Independent of any framework or UI concerns. Handles API simulations, data transformations, and core business rules.

### Data Layer
Manages data sources including Redux store for global state, mock product data, and search cache. Ensures data persistence and provides type-safe data models.

## Use of Custom Hooks
Custom hooks such as `useSearch` and `useCartItem` are used throughout the app to interact with Redux state. Components communicate with these hooks instead of directly accessing Redux, which keeps the data layer clean, encapsulates all business logic, and enables easy reuse. This approach ensures that logic for product searching and related features is centralized, maintainable, and decoupled from UI components.

### Types of Custom Hooks Used
- `useSearch`: Handles product search logic and caching
- `useDebounce`: Debounces user input for search
- `useCartItem`: Manages individual cart item logic
- `useShimmer`: Controls shimmer loading effects for UI

## LFU Cache Implementation in Async for Search Optimization
An LFU (Least Frequently Used) cache has been implemented to optimize search result caching through the API. This ensures that frequently searched queries are quickly retrieved, improving performance and reducing redundant data processing. The LFU cache logic is fully integrated with Redux and the search flow for efficient state management.

## Persistent Cart & Search Caching

- **Cart and search history are cached using Redux Persist.**
- When you add items to your cart or perform searches, this data is saved locally on your device.
- If you close (kill) the app and reopen it later, your cart contents and recent searches will be restored automatically.
- This ensures a seamless shopping experience, allowing you to resume where you left off without losing your cart or search history.

## Real API Simulation
All features in this app are a real simulation of APIs. The data flow, search, cart management, and product operations mimic real-world asynchronous API interactions, providing a realistic development and testing environment.


## Working Demo Video
To view the working video of the application, visit:
[https://drive.google.com/file/d/1dlpbpZIbYj_T7mBRdIPJYmJBUID6NkH5/view?usp=sharing](https://drive.google.com/file/d/1dlpbpZIbYj_T7mBRdIPJYmJBUID6NkH5/view?usp=sharing)

---

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
