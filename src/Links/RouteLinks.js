import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddOrder from '../component/Orders/AddOrder';
import Order from '../component/Orders/Order';
import AddUser from '../component/Users/AddUser';
import UserComponent from '../component/Users/UserComponent';
import AddComponent from '../component/Vendor/Add.component';
import  VendorListComponent  from '../component/Vendor/List.component';
import TestingComponent from '../component/TestingComponent';
import AddVendorMenu from '../component/Vendor/Menu/AddVendorMenu';
//let do this lazy
// const Product = lazy(() => import('./ProductHandler'));

// const AddUser = lazy( () => import('../component/Users/AddUser'))
// const VendorListComponent = lazy( () => import('../component/Vendor/List.component'))
// const AddVendorMenu = lazy( ()  =>  import('../component/Vendor/Menu/AddVendorMenu'))
// const Order = lazy( () => import('../component/Orders/Order'))

// const MyComponent = lazy(() => import('./MyComponent'))
const RouteLinks = () => {
    return (
        <div>
            <Switch>
            {/* /vendor/${id}/add */}
                <Route exact path = "/user/add" component = {AddUser} />
                <Route exact path ="/order/add" component={AddOrder}/>
                <Route exact path = "/order" component ={Order} />
                <Route  path ="/vendor/:id/add-menu" component={AddVendorMenu} />
                <Route exact path ="/vendor/add" component={AddComponent} />
                <Route exact path = "/vendors" component ={VendorListComponent} />
                <Route exact path = "/" component = {UserComponent}/>
                <Route exact path="/testing" component={TestingComponent} />
                <Route path=""  render= {() => (<div> <h2> 404 Url Not Found </h2> </div>)} />
            </Switch>
                
        </div>
            
    )
}

export default RouteLinks;