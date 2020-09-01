import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../../../context/auth';
import { useItemContext } from '../../../context/item';
import ImportedImage from '../ImportedImage';
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

const ItemUpdate = (props) => {
  const classes = useStyles();
  const [isUpdated, setIsUpdated] = useState(false);
  //const [isCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const { id: itemId } = useParams();
  const [imgDataUrl, setImgDataUrl] = useState();
  const nameRef = useRef(null);
  const producerRef = useRef(null);
  const detailsRef = useRef(null);
  const priceRef = useRef(null);
  const inventoryRef = useRef(null);
  const optionsRef = useRef(null);
  const { authContext } = useAuthContext();

  const fetchData = async (id) => {
    const item = await fetchItem(id);
    if(item) {
      setImgDataUrl(item.imageUrl);
      nameRef.current.value = item.name;
      producerRef.current.value = item.producer;
      detailsRef.current.value = item.description;
      optionsRef.current.value = JSON.stringify(item.options.map(option => { return {name: option.name, choices: option.choices}}));
      inventoryRef.current.value = item.inventory;
      priceRef.current.value = item.price;
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

  const validateOptions = () => {
    let isValid = false;
    let options = JSON.parse(optionsRef.current.value);
    if(options instanceof Array) {
      isValid = true;
      for (let option of options) {
        if(!(option.name && option.choices && option.choices instanceof Array)) {
          isValid = false;
        }
      }
    }
    if(!isValid) {
      alert("Options are have invalid format.\n Options must be in format:\n [\n{\n'name':'ENTER OPTION NAME HERE',\n 'choices': ['choice1','choice2','etc...']\n}]");
    }
    return isValid;
  }

  const validateForm = () => {
    if (nameRef.current.value && priceRef.current.value && inventoryRef.current.value && validateOptions()) {
      setIsError(false);
      return true;
    }
    setIsError(true);
    return false;
  }
  
  const onItemSubmit = async () => {

    validateForm();
    if (isError) {
      alert("Validation errors, please review elements");
      return;
    }

    let imageUrl = "###";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("picture",
        selectedFile,
        selectedFile.name);
      let { url } = await postImage(formData, authContext);
      imageUrl = url;
    } else {
      imageUrl = imgDataUrl;
    }
    let item = {
      name: nameRef.current.value,
      producer: producerRef.current.value,
      description: detailsRef.current.value,
      options: JSON.parse(optionsRef.current.value),
      imageUrl: imageUrl,
      inventory: inventoryRef.current.value,
      price: Number(priceRef.current.value)
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
        <Typography component="h1" variant="h5">Item Update</Typography>
        <ImportedImage dataUrl={imgDataUrl} />
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={nameRef}
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
                inputRef={producerRef}
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
                inputRef={detailsRef}
                defaultValue="UPDATE ME"
                name="itemDetail"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                id="itemDetail"
                label="Details"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={optionsRef}
                defaultValue="UPDATE ME"
                name="itemOptions"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                id="itemOptions"
                label="Options"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={inventoryRef}
                defaultValue={1}
                type="number"
                name="itemInventory"
                variant="outlined"
                fullWidth
                id="itemInventory"
                label="Inventory"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={priceRef}
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