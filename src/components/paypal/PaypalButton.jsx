import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import {CircularProgress, Container } from '@material-ui/core';

const CLIENT = {
  sandbox:
     "Ab8_gNCwzEzgMa1I7cqzfxVPBeB63uSYZNL6X5MgfqvB3kE7FBZIynQFpn5JVarL3fZhnD0QjWB-GliU",
  production:
      "Ab8_gNCwzEzgMa1I7cqzfxVPBeB63uSYZNL6X5MgfqvB3kE7FBZIynQFpn5JVarL3fZhnD0QjWB-GliU",
  // TODO add production key. This is the dev key
 };

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    this.paymentAmount = props.invoiceTotal;

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    //const classes = useStyles();

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !prevState.showButtons && isScriptLoaded;

    if (scriptJustLoaded && isScriptLoadSucceed) {
      console.log("paypal sdk script Loaded")
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        return { loading: false, showButtons: true, paid: false };
    }
    return null;
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"Arts",
          amount: {
            currency_code: "CAD",
            value: this.paymentAmount
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <Container>
        {loading && <CircularProgress />}

        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div>
            paid thank you!
          </div>
        )}
      </Container>
    );
  }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?currency=CAD&client-id=${CLIENT_ID}`)(PaypalButton);
