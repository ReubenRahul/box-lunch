import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import AddUser from './AddUser';
import UserComponent from './UserComponent';


const UserRoute = () => {
    console.log('dfs');
    return (
        <Router>

            <Switch>
                <Route exact path = "/user/add" component = {AddUser} />
                <Route  path = "/" component = {UserComponent}/>
            </Switch>
        </Router>
            
    )
}

export default UserRoute;