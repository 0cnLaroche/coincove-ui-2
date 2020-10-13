import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Link as StyledLink} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { Link as RouterLink, withRouter, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { useItemContext } from '../../context/item';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(8) // FIXME set padding on components instead
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
    },
    list: {
      width: 200
    }
  }));

const Link = (props) => {
  return (
    <StyledLink component={RouterLink} {...props}/>
  )
}

const Header = (props) => {
    const classes = useStyles();
    const { sections, title, basketSize } = props;
    const [ isComponentVisible, setIsComponentVisible ] = useState(false);
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
          <ListItem button onClick={logOut}>
            <ListItemIcon>
              <AccountCircleRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Log Out"/>
          </ListItem>
        )
      } else {
        return (
          <ListItem button to="/sign-in" component={NavLink}>
            <ListItemIcon>
              <AccountCircleRoundedIcon/>
            </ListItemIcon>
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
            onClose={handleDrawerClose}
          >
            <List className={classes.list} onClick={handleDrawerClose}>
              <ListItem button component={NavLink} to="/">
                <ListItemIcon>
                  <HomeRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItem>
              <ListItem button component={NavLink} to="/checkout">
                <Badge badgeContent={basketSize} color= "primary">
                  <ListItemIcon>
                    <ShoppingCartIcon/>
                  </ListItemIcon>
                </Badge>
                <ListItemText primary="Cart"/>
              </ListItem>
              {logLink(authContext)}
              <Divider/>
              {sections.map((section) => (
                <ListItem 
                  key={section.title} 
                  component={NavLink} 
                  to={section.url}
                  button
                >
                  <ListItemIcon>
                    <CheckRoundedIcon/>
                  </ListItemIcon>
                  <ListItemText primary={section.title}/>
                </ListItem>
              ))}
              <Divider/>
              <ListItem button component={NavLink} to="/contact-us">
                <ListItemIcon>
                  <EmailRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="Contact us"/>
              </ListItem>
              {authContext ? 
                <ListItem button component={NavLink} to="/manager/item-creator">
                  <ListItemText primary="Add item"/>
                </ListItem>
              : null }
              {authContext ? 
                <ListItem button component={NavLink} to="/manager/orders">
                  <ListItemText primary="Orders"/>
                </ListItem>
              : null }
              {(authContext && itemContext) ? 
                <ListItem button component={NavLink} to={`/manager/item-update/${itemContext._id}`}>
                  <ListItemText primary="Update item"/>
                </ListItem>
              : null }
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
          <Link
              color="inherit"
              noWrap
              variant="body2"
              className={classes.toolbarLink}
              component={RouterLink}
              to="/contact-us"
            >
            Contact us
          </Link> 
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
            {isComponentVisible && getDrawer()}
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