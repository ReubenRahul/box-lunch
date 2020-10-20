import React from 'react';
import './App.css';
import LunchBox from './LunchBox';
import RouteLinks from './Links/RouteLinks';
import { useStateValue } from './StateProvider';
import { Redirect } from 'react-router-dom';
function App() {

  const [ {redirect}] = useStateValue();
 
  return (
    <div className="App">
          <LunchBox />
         <RouteLinks />
          {redirect && <Redirect to = {redirect} />}
    </div>
  );
}

// class App extends React.Component {
//   [ {redirect}] = useStateValue();
//   render() {

//     // if( redirect ) {
//     //   return <Redirect to = {redirect} />
//     // }
//     return (
//       <div className="App">
//           <LunchBox />
//           <RouteLinks />
//       </div>
//     )
//   }
// }

export default App;