import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Button, ButtonGroup, IconButton, Typography} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CardMedia from '@material-ui/core/CardMedia';

const Item = ({basketIndex: key, item, handleIncrement, handleDecrement, handleRemove, handleOptionChange}) => {
    
    return (
        <Grid container justify="space-between" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="baseline" xs={12}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={ e => handleRemove(key) }>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={6} sm={3}>
                <CardMedia component="img" image={item.imageUrl} alt={item.name}/>
            </Grid>
            <Grid item container direction="column" xs={6} sm={9} spacing={3}>
                <Grid item container alignItems="center" xs={12}>
                    <Hidden xsDown>
                        <Grid item sm={5}>
                            <Typography variant="body2" color="textSecondary">
                                {item.description}
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid item xs>
                        <ButtonGroup size="small">
                            <Button onClick={ e => handleDecrement(key) }>-</Button>
                            <Button disableRipple disableFocusRipple>{item.units}</Button>
                            <Button onClick={ e => handleIncrement(key) }>+</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs>
                        <Typography align="right" display="inline" variant="subtitle1">$ {item.price}</Typography>
                    </Grid>
                    <Grid item container direction="row">
                        <Grid item xs={4}>Option here</Grid>
                    </Grid>

                </Grid>
            

            
            </Grid>

        </Grid>
    )
}
export default Item;