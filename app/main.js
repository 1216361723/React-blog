// main.js
import React from 'react';
import {render} from 'react-dom';
require('bootstrap/dist/css/bootstrap.min.css');
import './pulgs/layer/theme/default/layer.css';
require('./css/font-awesome.css');
require('./css/animate.css');
require('./css/style.css');
require('./css/hollis.css');

window.$ = window.jQuery  = require('jquery');

require('bootstrap/dist/js/bootstrap.min.js');
require('./pulgs/layer/layer.js');
require('./config/config.js');
require('./modules/utils/utils.js');
require('./modules/jQEvent/index.js');

import App from './modules/App.jsx';


render(<App />, document.getElementById('wrapper'));
