import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationStack from './navigation-stack';

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

function Index() {
  return (
    <PersistGate persistor={persistor}>
      <NavigationStack />
    </PersistGate>
  );
}
