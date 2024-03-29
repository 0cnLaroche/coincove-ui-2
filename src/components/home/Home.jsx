import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { 
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Button,
    makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Copyright } from '../';
import { fetchItemList, getHost } from '../../api';


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      //paddingTop: theme.spacing(8), // FIXME margin has been set on header
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function buildStructuredData(items) {
  if (items.length > 0) {
    const listItems = [];
    for (let i = 0; i < 3; i++) {
      listItems.push({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${getHost()}/items/${items[i]._id}`
      })
    }
    const data = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": listItems
    }
    return JSON.stringify(data);
  } else {
    return null;
  }
}

const Home = ({handleBasketItemAdded}) => {
    const classes = useStyles();
    const [ items, setItems] = useState([]);
    const structuredData = buildStructuredData(items);
    
    useEffect(() => {
      async function fetchData() {
        const fetchedItems = await fetchItemList();
        setItems(fetchedItems);
      }
      fetchData();
    },[]);

    return (
        <React.Fragment>
        <Helmet>
          <script type="application/ld+json">{structuredData}</script>
        </Helmet>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {items.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea component={RouterLink} to={`/items/${item._id}`}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.imageUrl}
                      title="Item image"
                    />
                  </CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Grid container justify="space-between">
                      <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>$ {ccyFormat(item.price)}</Typography>
                      </Grid>
                      <Grid item>
                        <Button size="small" variant="contained" color="secondary" onClick={(e) => handleBasketItemAdded(item)}>
                          Add to cart
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Copyright/>
        </React.Fragment>

    )
}
export default Home;