import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import VolunteerFileUpload from './VolunteerFileUpload';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <VolunteerFileUpload />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
