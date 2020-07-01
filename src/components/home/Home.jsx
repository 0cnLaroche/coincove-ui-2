import React, { useState, useEffect } from 'react';
import { 
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fetchItemList } from '../../api';


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
      paddingTop: theme.spacing(8),
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

const Home = ({handleBasketItemAdded}) => {
    const classes = useStyles();
    const [ items, setItems] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const fetchedItems = await fetchItemList();
        //console.log(fetchedItems);
        setItems(fetchedItems);
      }
      fetchData();
    },[]);

    return (
        <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {items.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.imageUrl}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography>
                      {item.producer}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button to={`/items/${item._id}`} size="small" color="primary" component={Link}>
                      View
                    </Button>
                    <Button size="small" color="primary" onClick={(e) => handleBasketItemAdded(item)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </main>

    )
}
export default Home;