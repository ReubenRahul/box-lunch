import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddOrder from '../component/Orders/AddOrder';
import Order from '../component/Orders/Order';
import AddUser from '../component/Users/AddUser';
import UserComponent from '../component/Users/UserComponent';
import AddComponent from '../component/Vendor/Add.component';
import { VendorListComponent } from '../component/Vendor/List.component';


const RouteLinks = () => {
    return (
        <div>
                <Route exact path = "/user/add" component = {AddUser} />
                <Route exact path = "/order" component ={Order} />
                <Route exact path ="/vendor/add" component={AddComponent} />
                <Route exact path = "/vendors" component ={VendorListComponent} />
                <Route exact path = "/" component = {UserComponent}/>
        </div>
            
    )
}

export default RouteLinks;