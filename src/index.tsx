import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingProvider } from './context';
import { GlobalStyles } from './components';
import { Provider } from 'react-redux';
import store from './redux/store';
import './assets/fonts/style.css';
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <LoadingProvider>
                    <App />
                </LoadingProvider>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
