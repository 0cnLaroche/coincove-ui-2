import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Stepper, Step, StepLabel} from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import PaypalButton from '../paypal/PaypalButton';
import OrderReview from './OrderReview';
import AddressForm from '../addressForm/AddressForm';
import Config from '../../util/Config';

const TAX_RATE = 0.07; // Taxes are disabled
const SHIPPING_RATE = Number(Config.order.shipping.rate);
const SHIPPING_THRESHOLD = Number(Config.order.shipping.threshold);

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(6)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  stepper: {
    backgroundColor: 'transparent',
    maxWidth:"sm"
  }
}))

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return (qty * (unit * 100))/100;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price};
}

function shipping(subtotal) {
  if (subtotal >= SHIPPING_THRESHOLD || subtotal === 0) {
    return 0.0;
  }
  return SHIPPING_RATE;
}

function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

function taxes(subtotal) {
  return Number((TAX_RATE * subtotal).toFixed(2));
}

const steps = ['Review Order', 'Shipping Address', 'Payment'];

const Checkout = ({basket, handleBasketUpdate}) => {
    const classes = useStyles();
    const history = useHistory();
    const [openApprovedDialog, setOpenApprovedDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0); 
    const [shippingAddress, setShippingAddress] = useState({
      firstName: null,
      lastName: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      country: null,
      postalCode: null
    }) ;
    const [isValidationError, setIsValidationError] = useState(true);
    const [email, setEmail] = useState();
    const rows = basket.map((item) => createRow(item.name, item.units, item.price));
    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = taxes(invoiceSubtotal); // Not used at the moment
    const invoiceShipping = shipping(invoiceSubtotal);
    const invoiceTotal = invoiceShipping + invoiceSubtotal;
    
    const handleOnApproved = () => {
      setOpenApprovedDialog(true);
      basket = [];
      handleBasketUpdate(basket);
    }
    const handleCloseApprovedDialog = () => {
      setOpenApprovedDialog(false);
      history.push('/'); // Redirect to homepage 
    }
    /** Handle stepping to next step. Do some validation before */
    const handleNext = () => {
      if(activeStep === 1 && isValidationError) {
        alert("Please complete shipping information");
      } else {
        setActiveStep(activeStep + 1);
      }
    }
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    }
    const handleAddressChange = (newAddress, errors) => {
      if(errors) {
        setIsValidationError(true);
      } else {
        setIsValidationError(false);
      }
      setShippingAddress(Object.assign(shippingAddress, newAddress));
    }
    const handleEmailChange = (newEmail) => {
      setEmail(email);
    }

    const getStepContent = (step) => {
      switch(step) {
        case 0:
          return <OrderReview items={basket} invoiceTotal={invoiceTotal} invoiceSubtotal={invoiceSubtotal} invoiceShipping={invoiceShipping} handleBasketUpdate={handleBasketUpdate}/>;
        case 1:
          return <AddressForm handleAddressChange={handleAddressChange} defaultValue={shippingAddress}/>;
        case 2:
          return (
          <PaypalButton 
            handleOnApproved={handleOnApproved}
            handleEmailChange={handleEmailChange}
            statement={{
              items: basket,
              total: invoiceTotal,
              shipping: invoiceShipping,
              subtotal: invoiceSubtotal,
              shippingAddress,
              email
            }}
            defaultEmail={email}
          />);
        default:
          throw new Error('Unknown step');
      }
    }

    return (
      <div>
        <Container component="main" maxWidth="md" className={classes.root}>
          <Typography component="h1" variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button className={classes.button} onClick={handleBack}>Back</Button>
                )}
                {activeStep !== (steps.length - 1) && (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={handleNext}>
                      Next
                  </Button>
                )}
              </div>
          </React.Fragment>
        </Container>
        <Dialog open={openApprovedDialog} onClose={handleCloseApprovedDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Payment confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Thank you for your Order ! Your payment has been confirmed,
                    you will receive more details about your order very shortly
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseApprovedDialog} color="primary">
                    Okay!
                </Button>
            </DialogActions>
        </Dialog>
      </div>

    )
}
export default Checkout;