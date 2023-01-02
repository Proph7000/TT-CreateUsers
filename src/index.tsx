import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { store } from './app/store';

import './index.scss';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
