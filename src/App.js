import React from 'react';
import Todos from './components/Todos/Todos';
import Toolbar from './components/Toolbar/Toolbar';
import '../node_modules/semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Toolbar />
      <Todos />
    </div>
  );
};
export default App;
