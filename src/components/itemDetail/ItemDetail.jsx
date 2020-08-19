import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, CardMedia, CardContent,
     Grid, 
     Typography, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import { fetchItem } from '../../api';
import { useItemContext } from '../../context/item';

const useStyles = makeStyles((theme) => ({
    
}))

const ItemDetail = (props) => {
    const { itemId } = useParams();
    const {handleBasketItemAdded} = props;
    const [item, setItem] = useState();
    const {itemContext, setItemContext} = useItemContext();

    const fetchData = async (id) => {
        const fetchedItem = await fetchItem(id);
        setItem(fetchedItem);
        setItemContext(fetchedItem);
    }

    useEffect(() => {
        fetchData(itemId);
    }, [itemId]);

    if (!item) {
        return "Loading ..."
    }
    return (
            <Grid container direction="row" justify="center" spacing={5}>
                <Grid item container xs={12} sm={6} direction="column" spacing={5}>
                    <Grid item>
                        <CardMedia
                            component="img"
                            image={item.imageUrl} 
                            alt="random"
                        />
                    </Grid>
                    <Grid item>
                        <CardContent>
                            <Typography variant="h3">{item.name}</Typography>
                            <Typography variant="h5">{item.producer}</Typography>
                            <Typography variant="body2">{item.description}</Typography>
                        </CardContent>   
                    </Grid>             
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Sidebar 
                        item={item}
                        handleBasketItemAdded={handleBasketItemAdded}
                    />
                </Grid>

            </Grid>
                

    )
}
export default ItemDetail;