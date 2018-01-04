import React from 'react';
import { render } from 'react-snapshot';
import { config } from 'dotenv';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

config();

render(<App />, document.getElementById('root'));
registerServiceWorker();
