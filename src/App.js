import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from '@material-ui/core';
import { SignUp, SignIn, Header, Home, Checkout, Manager, 
    PrivateRoute, ItemDetail, ContactUs } from './components';
import { AuthContext } from './context/auth';
import { ItemContext } from './context/item';

const sections = [
    { title:"Sign Up", url: "/sign-up"},
    { title:"Vendu", url: "/"}
  ];

const TITLE = process.env.REACT_APP_TITLE;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            basket:[],
            user: null,
            // Loading existing tokens
            authentication: JSON.parse(localStorage.getItem("authentication_storage")),
            currentItem: null,
            configs: null
        }
        this.handleBasketItemAdded = this.handleBasketItemAdded.bind(this);
        this.handleBasketUpdate = this.handleBasketUpdate.bind(this);
        this.setAuthentication = this.setAuthentication.bind(this);
        this.setCurrentItem = this.setCurrentItem.bind(this);
    }
    setAuthentication(data) {
        // FIXME this is unsafe . Use cookie instead
        localStorage.setItem("authentication_storage", JSON.stringify(data));
        this.setState({authentication: data});
    }
    setCurrentItem(item) {
        this.setState({currentItem:item});
    }
    handleBasketItemAdded(item) {
        item.units = 1;
        this.state.basket.push(item);
        this.setState({basket : this.state.basket});
    }
    handleBasketUpdate(newBasket) {
        this.setState({basket: newBasket})
    }
    render() {
        return (
            <AuthContext.Provider value={{authContext: this.state.authentication, setAuthContext: this.setAuthentication}}>
            <ItemContext.Provider value={{itemContext: this.state.currentItem, setItemContext: this.setCurrentItem}}>
            <Router>
                <CssBaseline />
                <Header title={TITLE} basketSize={this.state.basket.length} sections={sections}/>
                <Container maxWidth="lg" component="main" pt={8}>
                    <Switch>
                        <Route path="/" exact>
                            <Home handleBasketItemAdded={this.handleBasketItemAdded}/>
                        </Route>
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/contact-us" component={ContactUs}/>
                        <Route path="/items/:itemId" >
                            <ItemDetail handleBasketItemAdded={this.handleBasketItemAdded}/>
                        </Route>
                        <Route path="/checkout">
                            <Checkout basket={this.state.basket} handleBasketUpdate={this.handleBasketUpdate} />
                        </Route> 
                        <PrivateRoute path="/manager" component={Manager}/>
                    </Switch>
                </Container>
            </Router>
            </ItemContext.Provider>
            </AuthContext.Provider>

        )
    }
}

export default App;