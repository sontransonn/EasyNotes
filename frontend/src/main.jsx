import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './index.css'

import App from './App.jsx'
import ThemeProvider from './components/ThemeProvider.jsx';

import { store, persistor } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
  // </StrictMode>,
)
