import React from 'react';
import { Container, CssBaseline, CardMedia, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import { fetchItem } from '../../api';

const ItemDetail = (props) => {
    let { itemId } = useParams();
    const item = fetchItem(itemId);
    const {handleBasketItemAdded} = props;
    // Set item as state?
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Grid container spacing={5}>
                <Container>
                    <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random" 
                        alt="random"
                    />
                    This item id {itemId}
                </Container>
                <Sidebar 
                    item={item}
                    handleBasketItemAdded={handleBasketItemAdded}
                />
            </Grid>
        </Container>
    )
}
export default ItemDetail;