import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
    const classes = useStyles();
    const { item, handleBasketItemAdded } = props;
    return (
      <Grid item xs={12} md={4}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom>
            price
          </Typography>
          <Typography variant="h2" gutterBottom>
            {item.price.toFixed(2)}
          </Typography>
          <Button 
            type="button" 
            fullWidth 
            variant="contained" 
            color="primary"
            onClick={(e)=> handleBasketItemAdded(item)}>
              Add to basket
          </Button>
        </Paper>
      </Grid>
    );
  }