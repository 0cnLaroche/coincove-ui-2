import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Avatar, TextField, Button, Typography } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { postContactForm } from '../../api'


const useStyles = makeStyles((theme) => ({
    root: {
      paddingBottom: theme.spacing(8)
    },
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

const ContactUs = (props) => {
    const classes = useStyles();
    const [isSubmitted, setSubmitted] = useState(false);
    const name = React.useRef();
    const email = React.useRef();
    const message = React.useRef();

    const send = () => {
      const form = {
        name: name.current.value,
        email: email.current.value,
        message: message.current.value
      }
      postContactForm(form)
      .then(data => {
        setSubmitted(true);
      })
    }

    if(isSubmitted) {
      return (
        <Redirect to="/"/>
      )
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline/>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <EmailOutlinedIcon />
              </Avatar>
              <Typography component="h2" variant="h5">
                  Contact Us
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  // value={name}
                  // onChange={e => setName(e.target.value)}
                  inputRef={name}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  // value={email}
                  // onChange={e => setEmail(e.target.value)}
                  inputRef={email}
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
                  // value={message}
                  //onChange={e => setMessage(e.target.value)}
                  inputRef={message}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows="6"
                  name="message"
                  label="Message"
                  id="message"
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={send}
                >
                  Send your message
                </Button>
              </form>
          </div>
        </Container>
    )
}

export default ContactUs;