import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignUp, SignIn, Header, Home, Checkout, Manager, 
    PrivateRoute, ItemDetail, ContactUs } from './components';
import { AuthContext } from './context/auth';
import { ItemContext } from './context/item';

const sections = [
    { title:"Sign Up", url: "/sign-up", component:{SignUp}},
    { title:"Vendu", url: "/", component:{Home}},
    { title:"Contact us", url: "/contact-us", component:{ContactUs}}
  ];
const title = "SigneDeVie";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            basket:{
                items:[]
            },
            basketSize: 0,
            user: null,
            // Loading existing tokens
            authTokens: JSON.parse(localStorage.getItem("tokens")),
            currentItem: null
        }
        this.handleBasketItemAdded = this.handleBasketItemAdded.bind(this);
        this.handleBasketUpdate = this.handleBasketItemAdded.bind(this);
        this.setTokens = this.setTokens.bind(this);
        this.setCurrentItem = this.setCurrentItem.bind(this);
    }
    setTokens(data) {
        // FIXME this is unsafe . Use cookie instead
        // localStorage.setItem("tokens", JSON.stringify(data));
        this.setState({authTokens: data});
    }
    setCurrentItem(item) {
        console.log(item);
        this.setState({currentItem:item});
    }
    handleBasketItemAdded(item) {
        this.state.basket.items.push(item);
        this.setState({basketSize : this.state.basketSize + 1});
    }
    handleBasketUpdate(newBasket) {
        this.setState({basket: newBasket});
    }
    render() {
        return (
            <AuthContext.Provider value={{authTokens: this.state.authTokens, setAuthTokens: this.setTokens}}>
            <ItemContext.Provider value={{itemContext: this.state.currentItem, setItemContext: this.setCurrentItem}}>
            <Router>
                <Header title={title} basketSize={this.state.basketSize} sections={sections}/>
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
                        <Checkout basket={this.state.basket} />
                    </Route> 
                    <PrivateRoute path="/manager" component={Manager}/>
                </Switch>
            </Router>
            </ItemContext.Provider>
            </AuthContext.Provider>

        )
    }
}

export default App;