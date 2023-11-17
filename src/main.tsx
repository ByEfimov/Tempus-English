import React from 'react';
import { Provider } from 'react-redux';
import store, { persister } from './Store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './Assets/Styles/null.css';
import { BrowserRouter } from 'react-router-dom';
import ListenerFB from './Api/ListenerFireBase.tsx';
import './Api/firebase';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persister} loading={null}>
                    <ListenerFB>
                        <App />
                    </ListenerFB>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
