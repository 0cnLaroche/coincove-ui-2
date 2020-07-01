import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, CardMedia, CardContent,
     Grid, 
     Typography} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import { fetchItem } from '../../api';

const ItemDetail = (props) => {
    const { itemId } = useParams();
    const {handleBasketItemAdded} = props;
    const [item, setItem] = useState();

    const fetchData = async (id) => {
        const fetchedItem = await fetchItem(id);
        setItem(fetchedItem);
    }

    useEffect(() => {
        fetchData(itemId);
    }, [itemId]);

    if (!item) {
        return "Loading ..."
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Grid container spacing={5}>
                <Container>
                    <CardMedia
                        component="img"
                        image={item.imageUrl} 
                        alt="random"
                    />
                    <CardContent>
                        <Typography variant="h3">{item.name}</Typography>
                        <Typography variant="h5">{item.producer}</Typography>
                        <Typography variant="body2">{item.description}</Typography>
                    </CardContent>
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