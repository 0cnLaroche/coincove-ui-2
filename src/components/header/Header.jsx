import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {Link as StyledLink} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { Link as RouterLink, withRouter, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { useItemContext } from '../../context/item';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
      flex: 1,
      fontFamily: 'Pacifico',
      overflow: 'visible',
      underline: 'never'
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    }
  }));

const Link = (props) => {
  return (
    <StyledLink component={RouterLink} {...props}/>
  )
}

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const Header = (props) => {
    const classes = useStyles();
    const { sections, title, basketSize } = props;
    //const [drawerOpen, setDrawerOpen] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { authContext, setAuthContext } = useAuthContext();
    const { itemContext } = useItemContext();

    const handleDrawerOpen = () => {
      setIsComponentVisible(true);
    }
    const handleDrawerClose = () => {
      setIsComponentVisible(false);
    }

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
    const logLink = (auth) => {
      if(auth) {
        return (
          <ListItem onClick={logOut}>
            <ListItemText primary="Log Out"/>
          </ListItem>
        )
      } else {
        return (
          <ListItem to="/sign-in" component={Link}>
            <ListItemText primary="Log In"/>
          </ListItem>
        )
      }
    }

    const logOut = () => {
      setAuthContext(null);
    }
    const getDrawer = () => {
      return (
        <React.Fragment>
          <Drawer
            edge="end"
            open={isComponentVisible}
          >
            <List>
              <ListItem component={Link} to="/">
                <ListItemText primary="Home"/>
              </ListItem>
              <ListItem component={Link} to="/checkout">
                <ListItemIcon>
                  <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="Cart"/>
              </ListItem>
              {authContext ? 
                <ListItem component={Link} to="/manager/item-creator">
                  <ListItemText primary="Add item"/>
                </ListItem>
              : null }
              {authContext ? 
                <ListItem component={Link} to="/manager/orders">
                  <ListItemText primary="Orders"/>
                </ListItem>
              : null }
              {(authContext && itemContext) ? 
                <ListItem component={Link} to={`/manager/item-update/${itemContext._id}`}>
                  <ListItemIcon>
                    <ShoppingCartIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Update item"/>
                </ListItem>
              : null }
              {logLink(authContext)}
              {sections.map((section) => (
                <ListItem 
                  key={section.title} 
                  component={Link} 
                  to={section.url}
                >
                  <ListItemText primary={section.title}/>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </React.Fragment>
      )
    }
    const getLinks = () => {
      return (
        <React.Fragment>
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
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          {/*<Button to="#" size="small" component={RouterLink}>Subscribe</Button>*/}
          <Hidden mdUp>
            <Badge badgeContent={basketSize} color="secondary"> 
              <IconButton onClick={handleDrawerOpen}>
                <MenuIcon/>
              </IconButton>
            </Badge>
            <div ref={ref}>
              {isComponentVisible && getDrawer()}
            </div>
          </Hidden>
          <Typography
            component={NavLink}
            style={{ textDecoration: 'none', color: 'unset' }}
            to="/"
            variant="h3"
            color="inherit"
            align="center"
            noWrap

            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <Hidden smDown>
            <IconButton to="#" component={RouterLink}>
              <SearchIcon />
            </IconButton>
            <Badge badgeContent={basketSize} color="secondary">
              <IconButton to="/checkout" component={RouterLink} >
                <ShoppingCartIcon/>
              </IconButton>
            </Badge>
          {userButton(authContext)}
          </Hidden>
        </Toolbar>
        <Hidden smDown>
          <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            {getLinks()}
          </Toolbar>
        </Hidden>
      </React.Fragment>
    );
  }
  
  Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
  };
export default withRouter(Header);