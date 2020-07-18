import React from 'react';
import {
    Switch,
    Route,
    withRouter
  } from "react-router-dom";

import ItemCreator from './itemCreator/ItemCreator';
import ItemUpdate from './itemUpdate/ItemUpdate';

const Manager = (props) => {
    return (
        <Switch>
            <Route path="/manager" exact>Manager route</Route>
            <Route path="/manager/item-creator" component={ItemCreator}/>
            <Route path="/manager/item-update/:itemId" component={ItemUpdate}/>
        </Switch>
    )
}

export default withRouter(Manager);