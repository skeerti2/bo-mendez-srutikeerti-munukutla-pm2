import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Landing from './components/Landing.jsx';
import Instructions from './components/Instructions.jsx';
import Game from './components/game.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Battleship.css';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        {/* <Switch> */}
          <Route path='/' element={<Landing/>} />
          <Route path='/game-board' element={<Game/>} />
          <Route path='/instructions' element={<Instructions/>}  />
        {/* </Switch> */}

      </Routes>
    </div>
    </Provider>
  );
}

export default App;
