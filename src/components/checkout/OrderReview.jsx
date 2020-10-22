import React from 'react';
import styles from './Checkout.module.css';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Item from './Item';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

const OrderReview = ({items, invoiceTotal, invoiceSubtotal, invoiceShipping, handleBasketUpdate}) => {
    
  const handleIncrement = (key) => {
    items[key].units = items[key].units + 1;
    handleBasketUpdate(items)
  }
  const handleDecrement = (key) => {
    if (items[key].units > 1) {
      items[key].units = items[key].units - 1;
      handleBasketUpdate(items);
    }
  }
  const handleRemove = (key) => {
    items.splice(key, 1);
    handleBasketUpdate(items);
  }
  const handleOptionChange = (itemKey, optionKey, event) => {
    items[itemKey].options[optionKey].value = event.target.value;
    handleBasketUpdate(items);
  }
  
  return (
        <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Order Details
              </TableCell>
              <TableCell align="right" colSpan={1}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell colSpan={4}>
                  <Item item={item} basketIndex={index} handleIncrement={handleIncrement} handleDecrement={handleDecrement} handleRemove={handleRemove} handleOptionChange={handleOptionChange}/>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} colSpan={2}/>
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell align="right">{ccyFormat(invoiceShipping)}</TableCell>
            </TableRow>
            {/*<TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>*/}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell align="right">$ {ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default OrderReview;