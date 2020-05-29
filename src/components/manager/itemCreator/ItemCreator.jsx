import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button
} from '@material-ui/core';

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
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
}));

// Creates 
const ImportedImage = (props) => {
  const { dataUrl } = props;
  return (
    <div>
      {dataUrl ?
        <img src={dataUrl} alt="user imported" id="imported" />
        : <p>no file selected</p>
      }
    </div>
  )
}


const ItemCreator = (props) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [imgDataUrl, setImgDataUrl] = useState();

  const onFileChange = event => {
    var file = event.target.files[0];
    setSelectedFile(file);

    var reader = new FileReader();
    reader.onload = () => {
      var dataUrl = reader.result;
      setImgDataUrl(dataUrl);
    }
    reader.readAsDataURL(file);

  }
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("product picture",
      selectedFile,
      selectedFile.name)

    // Call API with formData
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new item
                </Typography>
        <ImportedImage dataUrl={imgDataUrl} />
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="itemName"
                variant="outlined"
                required
                fullWidth
                id="itemName"
                label="Item name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="itemCreator"
                variant="outlined"
                required
                fullWidth
                id="itemCreator"
                label="Creator"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="itemDetail"
                variant="outlined"
                multiline
                fullWidth
                id="itemDetail"
                label="Details"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="itemAmount"
                variant="outlined"
                required
                fullWidth
                id="itemAmount"
                label="Amount"
                autoFocus
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
          <input
            type="file"
            accept="images/*"
            multiple
            className={classes.input}
            id="contained-button-file"
            onChange={onFileChange} />
          <label htmlFor="contained-button-file">
            <Button fullWidth variant="contained" color="primary" component="span" className={classes.button}>
              Upload picture
                      </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
                    </Button>
        </form>
      </div>

    </Container>
  )
}

export default ItemCreator;