import React from 'react';
import styles from './Checkout.module.css';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {PaypalButton} from '../';

const TAX_RATE = 0.07; // Taxes are disabled
const SHIPPING_RATE = 5.0;
const ITEMS_FOR_FREE_SHIPPING = 5;

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

function shipping(items) {
  if (items.length >= ITEMS_FOR_FREE_SHIPPING 
    || items.length === 0) {
    return 0.0;
  }
  return SHIPPING_RATE;
}

function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

const Checkout = ({basket}) => {
    const rows = basket.items.map((item) => createRow(item.name, 1, item.price));
    const invoiceSubtotal = subtotal(rows);
    //const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceShipping = shipping(basket.items);
    const invoiceTotal = invoiceShipping + invoiceSubtotal;

    return (
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
                  <TableCell align="right">{row.unit}</TableCell>
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
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <PaypalButton order={
          {
            items: basket.items,
            total: invoiceTotal,
            shipping: invoiceShipping,
            subtotal: invoiceSubtotal
          }
          }/> 
        </Container>

    )
}
export default Checkout;