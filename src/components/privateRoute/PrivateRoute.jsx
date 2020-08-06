import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { authContext } = useAuthContext();
    return (
        <Route {...rest} render={
            (props) => 
                authContext ?
                (<Component {...props}/>) :
                (<Redirect to="/sign-in"/>)
        }/>
    )
}
export default PrivateRoute;