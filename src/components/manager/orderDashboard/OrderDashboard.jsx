import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    ButtonGroup, 
    Button, 
    Typography,
    TextField, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle  } from '@material-ui/core';

import { getOrder } from '../../../api'
import OrderDetail from './OrderDetail';
import Address from './Address';
import status from './Status';
import { useAuthContext } from '../../../context/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolbar: {

    }
}));

const formatDate = (object) => {
    let date = new Date(object);
    return date.toLocaleString('en-CA');
  }

const OrderDashboard = () => {
    const { id: orderId } = useParams();
    const classes = useStyles();
    const [order, setOrder] = useState();
    const [isError, setIsError] = useState(false);
    const [ shippingDialogOpen, setShippingDialogOpen ] = useState(false);
    const { authContext } = useAuthContext();
    const trackingIdFieldRef = React.useRef();

    const handleClickOpenShippingDialog = () => {
        setShippingDialogOpen(true);
    }
    const handleCloseShippingDialog = () => {
        setShippingDialogOpen(false);
    }
    const handleSubmitShipping = () => {
        order.trackingId = trackingIdFieldRef.current.value;
        order.status = status.SHIPPED;
        order.updated = Date.now();
        setOrder(order);
        setShippingDialogOpen(false);
    }

    useEffect(()=> {
        const fetchData = async () => {
            try {
                let order = await getOrder(orderId, authContext)
                setOrder(order);
            } catch (err) {
                setIsError(true);
            }

        }
        fetchData();
    }, [orderId])

    if (isError) {
        return(
            <div>Error. Try to relogin</div>
        )
    }
    else if(!order) {
        return (
            <div>Order not found</div>
        )
    }

    return (
        <div className={classes.root}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={handleClickOpenShippingDialog}>Ship</Button>
                <Button>Refund</Button>
                <Button color="secondary">Cancel</Button>
            </ButtonGroup>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} direction="column" container spacing={1}>
                    <Grid item xs>
                        <Typography display="inline">Order Status : </Typography>
                        <Typography display="inline">{order.status}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography display="inline">Shipment Tracking Id : </Typography>
                        {order.trackingId ? 
                        <Typography display="inline">{order.trackingId}</Typography> 
                        : null}
                    </Grid>
                    <Grid item xs>
                        <Typography display="inline">Order Created : </Typography>
                        <Typography display="inline">{formatDate(order.created)}</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography display="inline">Order Updated : </Typography>
                        {order.updated ? 
                        <Typography display="inline">{formatDate(order.updated)}</Typography> 
                        : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Shipping Address</Typography>
                    <Address address={order.shippingAddress}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                   <OrderDetail order={order}/>
                </Grid>
            </Grid>
            <Dialog open={shippingDialogOpen} onClose={handleCloseShippingDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Submit Shipping Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update order as "Shipped" and save the shipping tracking Id
                    </DialogContentText>
                    <TextField inputRef={trackingIdFieldRef} autoFocus margin="dense" id="trackingId" label="Tracking Id" fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseShippingDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitShipping} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default OrderDashboard;