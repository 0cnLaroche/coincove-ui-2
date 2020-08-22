import React, {useState} from 'react';
import styles from './Checkout.module.css';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

const OrderReview = ({rows, invoiceTotal, invoiceSubtotal, invoiceShipping}) => {
    return (
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
    )
}

export default OrderReview;