import React from 'react';
import {
    Switch,
    Route,
    withRouter
  } from "react-router-dom";

import ItemCreator from './itemCreator/ItemCreator';

const Manager = (props) => {
    return (
        <Switch>
            <Route path="/manager" exact>Manager route</Route>
            <Route path="/manager/item-creator" component={ItemCreator}/>
        </Switch>
    )
}

export default withRouter(Manager);