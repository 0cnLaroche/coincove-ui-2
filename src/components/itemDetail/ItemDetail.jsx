import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { CardMedia, CardContent,
     Grid, 
     Typography, makeStyles } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import {fetchItem, getHost} from '../../api';
import { useItemContext } from '../../context/item';

// const useStyles = makeStyles((theme) => ({ }));

const ItemDetail = (props) => {
    const { itemId } = useParams();
    const {handleBasketItemAdded} = props;
    const [item, setItem] = useState();
    const {setItemContext} = useItemContext();
    const location = useLocation();
    const structuredData = item ? JSON.stringify({
        "@context" : "http://schema.org",
        "@type" : "Product",
        "name" : item.name,
        "image" : `${item.imageUrl}`,
        "description" : item.description,
        "brand" : {
            "@type" : "Brand",
            "name" : item.producer
        },
        "offers" : {
            "@type" : "Offer",
            "price" : `${item.price.toFixed(2)}`,
            "availability": item.inventory ? "https://schema.org/InStock" : "http://schema.org/OutOfStock" ,
            "priceCurrency": "CAD",
            "url": `${getHost()}${location.pathname}`
        }
    }) : null;

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
        <React.Fragment>
            <Helmet>
                <script type="application/ld+json">
                    {structuredData}
                </script>
                <meta property="og:type" content="product"/>
                <meta property="og:title" content={item.name}/>
                <meta property="og:url" content={`${getHost()}${location.pathname}`}/>
                <meta property="og:image" content={item.imageUrl}/>
                <meta property="product:price:amount" content={item.price.toFixed(2)}/>
                <meta property="product:price:currency" content="CAD"/>
            </Helmet>
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
        </React.Fragment>
    )
}
export default ItemDetail;