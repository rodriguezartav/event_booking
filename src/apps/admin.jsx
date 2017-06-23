import React from 'react';
import ReactDOM from 'react-dom';
import App from '../component';
import { AppContainer } from 'react-hot-loader';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <App {...window.__APP_INITIAL_STATE__} />
    </AppContainer>

   , document.getElementById('root')
  );
};

render(App);

if (module.hot) module.hot.accept('../component', () => render(App));
