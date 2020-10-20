import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddOrder from '../component/Orders/AddOrder';
import Order from '../component/Orders/Order';
import AddUser from '../component/Users/AddUser';
import UserComponent from '../component/Users/UserComponent';
import AddComponent from '../component/Vendor/Add.component';
import { VendorListComponent } from '../component/Vendor/List.component';
import AddVendorMenu from '../component/Vendor/Menu/AddVendorMenu';


const RouteLinks = () => {
    console.log('router link')
    return (
        <div>
            <Switch>
            {/* /vendor/${id}/add */}
                <Route exact path = "/user/add" component = {AddUser} />
                <Route exact path = "/order" component ={Order} />
                <Route  path ="/vendor/:id/add-menu" component={AddVendorMenu} />
                <Route exact path ="/vendor/add" component={AddComponent} />
                <Route exact path = "/vendors" component ={VendorListComponent} />
                <Route exact path = "/" component = {UserComponent}/>
                <Route path=""  render= {() => (<div> <h2> 404 Url Not Found </h2> </div>)} />
            </Switch>
                
        </div>
            
    )
}

export default RouteLinks;