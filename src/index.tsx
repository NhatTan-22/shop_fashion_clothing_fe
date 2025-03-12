import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingProvider } from './context';
import { Provider } from 'react-redux';
import store from './redux/store';
import './assets/fonts/style.css';
import './utils/i18n';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ConfigProvider } from 'antd';
import themeConfig from './config/themeConfig';
import { GlobalStyles } from '~/components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <ConfigProvider theme={themeConfig}>
                    <LoadingProvider>
                        <App />
                    </LoadingProvider>
                </ConfigProvider>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
