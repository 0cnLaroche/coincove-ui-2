import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../../context/auth';
import { useItemContext } from '../../../context/item';
import { useParams, Redirect } from 'react-router-dom';
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
import { putItem, postImage, fetchItem } from '../../../api';

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
  )}

const ItemUpdate = (props) => {
  const classes = useStyles();
  const [isUpdated, setIsUpdated] = useState(false);
  //const [isCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const { itemId } = useParams();
  const [imgDataUrl, setImgDataUrl] = useState();
  const nameTextField = useRef(null);
  const producerTextField = useRef(null);
  const detailsTextField = useRef(null);
  const priceTextField = useRef(null);
  const { authContext } = useAuthContext();

  const fetchData = async (id) => {
    const item = await fetchItem(id);
    if(item) {
      setImgDataUrl(item.imageUrl);
      nameTextField.current.value = item.name;
      producerTextField.current.value = item.producer;
      detailsTextField.current.value = item.description;
      priceTextField.current.value = item.price;
    } else {
      setIsError(true);
    }
}
  

  useEffect(() => {
    if( itemId !== undefined ) {
      fetchData(itemId);
    } else {
      setIsError(true);
    }
  }, [itemId]);

  const onFileChange = event => {
    var file = event.target.files[0];
    setSelectedFile(file);

    var reader = new FileReader();
    reader.onload = () => {
      var dataUrl = reader.result;
      console.log(dataUrl);
      setImgDataUrl(dataUrl);
    }
    reader.readAsDataURL(file);
  }
  
  const onItemSubmit = async () => {
    var imageUrl = "###";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("picture",
        selectedFile,
        selectedFile.name);
      var { url } = await postImage(formData, authContext);
      imageUrl = url;
    } else {
      imageUrl = imgDataUrl;
    }
    var item = {
      name: nameTextField.current.value,
      producer: producerTextField.current.value,
      description: detailsTextField.current.value,
      imageUrl: imageUrl,
      inventory: 1,
      price: Number(priceTextField.current.value)
    }
    item = await putItem(item, itemId, authContext);
    setIsUpdated(true);
  }
  if(isUpdated) {
    return (
    <Redirect to={`/items/${itemId}`}/>
    )
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
                inputRef={nameTextField}
                defaultValue="UPDATE ME"
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
                inputRef={producerTextField}
                defaultValue="UPDATE ME"
                name="itemProducer"
                variant="outlined"
                required
                fullWidth
                id="itemProducer"
                label="Creator"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={detailsTextField}
                defaultValue="UPDATE ME"
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
                inputRef={priceTextField}
                defaultValue="UPDATE ME"
                name="itemPrice"
                variant="outlined"
                required
                fullWidth
                id="itemPrice"
                label="Price"
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
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={e => onItemSubmit()}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ItemUpdate;