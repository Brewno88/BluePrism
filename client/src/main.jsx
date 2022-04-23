import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ReactQuery from './ReactQuery';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactQuery>
      <App />
    </ReactQuery>
  </React.StrictMode>
);
