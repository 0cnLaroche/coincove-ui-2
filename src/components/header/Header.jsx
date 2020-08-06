import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { useItemContext } from '../../context/item';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  }));

const Header = (props) => {
    const classes = useStyles();
    const { sections, title } = props;
    const { authContext, setAuthContext } = useAuthContext();
    const { itemContext } = useItemContext();
    const basketSize = props.basketSize;

    const userButton = (auth) => {
      if(auth) {
        return (
          <Button onClick={logOut} variant="outlined" size="small">
          Log out
          </Button>
        )
      } else {
        return (
          <Button to="/sign-in" variant="outlined" color="primary" size="small" component={RouterLink}>
          Sign in
          </Button>
        )
      }
    }

    const logOut = () => {
      setAuthContext(null);
    }

    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <Button to="#" size="small" component={RouterLink}>Subscribe</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <IconButton to="#" component={RouterLink}>
            <SearchIcon />
          </IconButton>
          <Badge badgeContent={basketSize} color="primary">
            <IconButton to="/checkout" component={RouterLink} >
              <ShoppingCartIcon/>
            </IconButton>
          </Badge>
          {userButton(authContext)}
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          <Link
              color="inherit"
              noWrap
              //key="home"
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
              to="/"
            >
              Home
          </Link>
          {authContext ? 
          <Link
              color="inherit"
              noWrap
              //key="home"
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
              to="/manager/item-creator"
            >
              Add new item
          </Link> 
          : null }
          {authContext ? 
          <Link
              color="inherit"
              noWrap
              //key="home"
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
              to="/manager/orders"
            >
              View orders
          </Link> 
          : null }
          {(authContext && itemContext) ? 
          <Link
              color="inherit"
              noWrap
              //key="home"
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
              to={`/manager/item-update/${itemContext._id}`}
            >
            Update Item
          </Link> 
          : null }
          {sections.map((section) => (
            <Link
              to={section.url}
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    );
  }
  
  Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
  };
export default withRouter(Header);