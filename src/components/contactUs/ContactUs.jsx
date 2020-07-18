import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Avatar, TextField, Button,
Typography } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';


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

const ContactUs = (props) => {
    const classes = useStyles();
    const name = React.useRef();
    const email = React.useRef();
    const message = React.useRef();
    const send = () => {
        const mailto = 
        `mailto:samuellaroche@live.ca?subject=client-email-${name.current.value}&cc=${email.current.value}&body=${message.current.value}`;
        console.log(mailto);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <EmailOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Contact Us
            </Typography>
        <form className={classes.form} noValidate>
          <TextField
            // value={name}
            // onChange={e => setName(e.target.value)}
            ref={name}
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
            ref={email}
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
            ref={message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
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