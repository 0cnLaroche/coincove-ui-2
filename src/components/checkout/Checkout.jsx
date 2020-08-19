import React, {useState} from 'react';
import styles from './Checkout.module.css';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {PaypalButton} from '../';

const TAX_RATE = 0.07; // Taxes are disabled
const SHIPPING_RATE = Number(process.env.REACT_APP_SHIPPING_RATE);
const SHIPPING_THRESHOLD = Number(process.env.REACT_APP_SHIPPING_THRESHOLD);

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
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

const Checkout = ({basket}) => {
  const [openApprovedDialog, setOpenApprovedDialog] = useState(false);  
  const rows = basket.items.map((item) => createRow(item.name, 1, item.price));
    const invoiceSubtotal = subtotal(rows);
    //const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceShipping = shipping(invoiceSubtotal);
    const invoiceTotal = invoiceShipping + invoiceSubtotal;
    
    const handleOnApproved = () => {
      // TODO Empty baskets
      setOpenApprovedDialog(true);
    }
    const handleCloseApprovedDialog = () => {
      setOpenApprovedDialog(false);
    }

    return (
      <div>
        <Container component="main" maxWidth="sm">
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{ccyFormat(row.unit)}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Shipping</TableCell>
                <TableCell align="right">{ccyFormat(invoiceShipping)}</TableCell>
              </TableRow>
              {/*<TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>*/}
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">$ {ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <PaypalButton handleOnApproved={handleOnApproved} order={
          {
            items: basket.items,
            total: invoiceTotal,
            shipping: invoiceShipping,
            subtotal: invoiceSubtotal
          }
          }/>
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