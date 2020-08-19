import React from 'react';
import {
    Switch,
    Route,
    withRouter
  } from "react-router-dom";

import ItemCreator from './itemCreator/ItemCreator';
import ItemUpdate from './itemUpdate/ItemUpdate';
import Orders from './orders/Orders'
import OrderDashboard from './orderDashboard/OrderDashboard';

const Manager = (props) => {
    return (
        <Switch>
            <Route path="/manager" exact>Manager route</Route>
            <Route path="/manager/item-creator" component={ItemCreator}/>
            <Route path="/manager/item-update/:id" component={ItemUpdate}/>
            <Route path="/manager/orders" exact component={Orders}/>
            <Route path="/manager/orders/:id" component={OrderDashboard}/>
        </Switch>
    )
}

export default withRouter(Manager);