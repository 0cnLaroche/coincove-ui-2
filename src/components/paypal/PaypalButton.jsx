import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import {CircularProgress, Grid, Container, TextField, Typography } from '@material-ui/core';
import { postOrder } from '../../api';

const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

let PayPalButton = null;

const PaypalButton = ({isScriptLoaded, isScriptLoadSucceed, statement, handleOnApproved, defaultEmail, handleEmailChange}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [paymentIsError, setPaymentIsError] = useState(false);
  const [emailIsError, setEmailIsError] = useState(false);
  const emailRef = useRef();

  window.React = React;
  window.ReactDOM = ReactDOM;

  const createOrder = (data, actions) => {
    const { total, items } = statement;
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

  const onApprove = (data, actions) => {
    const {total, subtotal, shipping, items, shippingAddress} = statement;
    const paymentData = {
      payerId: data.payerID,
      orderId: data.orderID
    };
    const orderLines = items.map( item => {
      return {
        description: item.name, 
        itemId: item._id, 
        units: item.units, 
        price: item.price, 
        discount: item.discount,
        options: item.options
      }
    });
    const order = {
      shippingAddress,
      billingAddress: null, 
      orderLines,
      total,
      subtotal,
      shipping,
      paymentId: null,
      paypalOrderId: data.orderID,
      email: emailRef.current.value
    }

    actions.order.capture().then(details => {
      const captureId = details.purchase_units[0].payments.captures[0].id;
      order.paymentId = captureId;
      //console.log(paymentData);
      const {address_line_1, address_line_2, admin_area_1, admin_area_2, 
        country_code, postal_code } = details.purchase_units[0].shipping.address;

      const billingAddress = {
        address1: address_line_1,
        address2: address_line_2,
        city: admin_area_1,
        state: admin_area_2,
        country: country_code,
        postalCode: postal_code
      }

      order.billingAddress = billingAddress;

      postOrder(order);
      console.debug(order);
      console.info("Payment Approved: ", paymentData);
      handleOnApproved();
      setShowButtons(false);
      setPaid(true);
    })
    .catch(error => {
      setPaymentIsError(true);
      alert("There was an error while processing your payment. Your order will not be submitted")
    });
  };

  const handleOnChange = (event) => {
    let email = event.target.value;
    if(/\S+@\S+\.\S+/.test(email)) {
      setEmailIsError(false);
      setShowButtons(true);
    } else {
      console.error("Email is invalid")
      setEmailIsError(true);
      setShowButtons(false);
    }
    handleEmailChange(email)
  }

  useEffect(()=> {

    if(isScriptLoaded && isScriptLoadSucceed && !showButtons) {
      console.info("paypal sdk script Loaded")
      PayPalButton = window.paypal.Buttons.driver("react", {
        React,
        ReactDOM
      });
      setLoading(false);
      //setShowButtons(true);
    }
  },[isScriptLoaded, isScriptLoadSucceed]);

  return (
      <Container maxWidth="sm">
        <Grid container orientation="column" spacing={6}>
          {loading && <CircularProgress />}
          {!loading && (
            <Grid item xs={12}>
            <Typography>
              Please enter a valid email address to send you your order confirmation
            </Typography>
              <TextField
                required
                type="email"
                id="email"
                name="email"
                label="email"
                defaultValue={defaultEmail}
                inputRef={emailRef}
                error={emailIsError}
                helperText={emailIsError ? "Email address is invalid": null}
                fullWidth
                autoComplete="email"
                onChange={handleOnChange}
              />
            </Grid>
          )}

          {showButtons && (
            <Grid item xs={12}>
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </Grid>
          )}

          {paid && (
            <div>
              paid thank you!
            </div>
          )}
        </Grid>
      </Container>
    );
  }

export default scriptLoader(`https://www.paypal.com/sdk/js?currency=CAD&client-id=${CLIENT_ID}`)(PaypalButton);
