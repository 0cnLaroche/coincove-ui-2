import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Address = ({address}) => {
    return (
        <Box>
            <Typography>{address.firstName} {address.lastName}</Typography>
            <Typography>{address.address1}</Typography>
            <Typography>{address.address2}</Typography>
            <Typography>{address.city}, {address.state}, {address.postalCode}</Typography>
            <Typography>{address.country}</Typography>
        </Box>
    )
}
export default Address;