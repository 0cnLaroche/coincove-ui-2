import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Typography, Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Copyright } from '../';
import { authenticate as auth } from '../../api';
import { useAuth } from '../../context/auth';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = (props) => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authTokens, setAuthTokens} = useAuth();

  const login = async () => {
    console.log("user:" + userName + " pwd: " + password);
    var response = await auth(userName, password);
    var { token } = response;
    console.log(token);
    if (token) {
      setAuthTokens(token);
      setLoggedIn(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }
  const handleCloseErrorAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsError(false);
  };
  //const referer = props.location.state.referer || "/";
// TODO call api on submit

  if(isLoggedIn) {
    return (
      <Redirect to="/"/>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={userName}
            onChange={e => setUserName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseErrorAlert}>
                <Alert onClose={handleCloseErrorAlert} severity="error">
                  The username or password provided were incorrect!
                </Alert>
            </Snackbar>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignIn;