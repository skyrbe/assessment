import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { whyDidYouUpdate } from 'why-did-you-update';
import store from './store';
import routes from './routes';

import './include/bootstrap';

const target = document.querySelector('#root');

if (process.env.NODE_ENV !== 'production') {
  // whyDidYouUpdate(React);
}

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  target
);
