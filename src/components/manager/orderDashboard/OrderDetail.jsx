import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}
/** 
 * Formats options array into string, each option seperated by
 * return char
 * @param options array of option
 * @returns options formatted as string
 * */
function optionsFormat(options) {
  let optionsStrArray = options.map(option => option.name + ": " + option.value)
  return optionsStrArray.join("\n")
}
/** 
 * Creates formatted row elements
 * @param desc item description
 * @param options item options
 * @param qty quantity of same item in the order
 * @param unit item unit price
 * @returns formatted fields
 */
function createRow(desc, options, qty, unit) {
  const price = priceRow(qty, unit);
  return {desc, qty, options: optionsFormat(options), unit, price};
}

/** Displays order details, marchant view */
const OrderDetail = ({order}) => {
    const { orderLines, shipping, subtotal, total } = order; 
    const rows = orderLines.map((line) => createRow(line.description, line.options, line.units, line.price));

    return (
        <TableContainer component={Paper}>
          <Table  aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Order Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell>Options</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{row.options}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{ccyFormat(row.unit)}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} colSpan={2}/>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{ccyFormat(subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Shipping</TableCell>
                <TableCell align="right">{ccyFormat(shipping)}</TableCell>
              </TableRow>
              {/*<TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>*/}
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">$ {ccyFormat(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

    )
}
export default OrderDetail;