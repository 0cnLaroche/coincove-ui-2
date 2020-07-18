import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { authTokens } = useAuthContext();
    return (
        <Route {...rest} render={
            (props) => 
                authTokens ?
                (<Component {...props}/>) :
                (<Redirect to="/sign-in"/>)
        }/>
    )
}
export default PrivateRoute;