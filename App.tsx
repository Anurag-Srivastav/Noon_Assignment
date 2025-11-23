import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { ToastProvider } from "./src/context/ToastContext";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
