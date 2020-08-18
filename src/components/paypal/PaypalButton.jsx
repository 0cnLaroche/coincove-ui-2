import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import {CircularProgress, Container } from '@material-ui/core';
import { postOrder } from '../../api';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };
    this.order = props.order;
    //this.paymentAmount = props.invoiceTotal;

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
    const { total, items } = this.order;
    console.log("Creating Order");
    return actions.order.create({
      purchase_units: [
        {
          description: "description",
          amount: {
            currency_code: "CAD",
            value: total
          },
          //items: items.map( (item) => { return { name: item.name, unit_amount: item.price, quantity: 1 }}),
          //invoice_id: ""
        }
      ],
      //payer: ""
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const captureId = details.purchase_units[0].payments.captures[0].id;
      const paymentData = {
        payerId: data.payerID,
        orderId: data.orderID,
        captureId: captureId
      };

      const {total, subtotal, shipping, items} = this.order;
      const {address_line_1, address_line_2, admin_area_1, admin_area_2, 
        country_code, postal_code } = details.purchase_units[0].shipping.address;

      const shippingAddress = {
        address1: address_line_1,
        address2: address_line_2,
        city: admin_area_1,
        state: admin_area_2,
        country: country_code,
        postalCode: postal_code
      }

      const orderLines = items.map( item => {
        return {
          description: item.name, 
          itemId: item._id, 
          units: 1, 
          price: item.price, 
          discount: item.discount
        }
      })

      let order = {
        shippingAddress,
        billingAddress: shippingAddress,
        orderLines,
        total,
        subtotal,
        shipping,
        paymentId: captureId
      }
      console.log(order);
      postOrder(order);
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
