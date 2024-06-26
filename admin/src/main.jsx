import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Wrapper from './Wrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Wrapper>
            <App />
        </Wrapper>
    </React.StrictMode>,
);
