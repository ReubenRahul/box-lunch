import React from 'react';
import './App.css';
import LunchBox from './LunchBox';
import UserRoute from './component/Users/UserRoute';
import { Switch,  Route, BrowserRouter} from 'react-router-dom';
import AddUser from './component/Users/AddUser';


function App() {
  
  return (
    <div className="App">
        <LunchBox />
          <Switch>
            <Route path = "/" component = {UserRoute} />
          </Switch>

    </div>
  );
}

export default App;