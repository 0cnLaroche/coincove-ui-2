import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/auth';
import ImportedImage from '../ImportedImage';
import { useParams, Redirect } from 'react-router-dom';
import Compressor from 'compressorjs';
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
import { postItem, postImage, fetchItem } from '../../../api';

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
  }
}));

const ItemCreator = (props) => {
  const classes = useStyles();
  const [isCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const { itemId } = useParams();
  const [imgDataUrl, setImgDataUrl] = useState();
  const [itemName, setItemName] = useState();
  const [itemCreator, setItemCreator] = useState();
  const [itemDetail, setItemDetail] = useState();
  const [itemOptions, setItemOptions] = useState();
  const [itemInventory, setItemInventory] = useState(1);
  const [itemPrice, setItemPrice] = useState();
  const { authContext } = useAuthContext();

  const fetchData = async (id) => {
    const item = await fetchItem(id);
    // FIXME This triggers rerendering for every fields
    setItemName(item.name);
    setItemCreator(item.producer);
    setItemDetail(item.description);
    setItemOptions(JSON.stringify(item.options, 1))
    setItemPrice(item.price);
    setImgDataUrl(item.imageUrl);
}
  
  useEffect(() => {
    if( itemId !== undefined ) {
      fetchData(itemId);
    }
  }, [itemId]);

  const onFileChange = (event) => {
    var file = event.target.files[0];
    setSelectedFile(file);

    var reader = new FileReader();
    reader.onload = () => {
      var dataUrl = reader.result;
      setImgDataUrl(dataUrl);
    }
    reader.readAsDataURL(file);
  }

  const validateOptions = () => {
    let isValid = false;
    let options = JSON.parse(itemOptions);
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
    if (itemName && itemPrice && itemInventory && validateOptions()) {
      setIsError(false);
      return true;
    }
    setIsError(true);
    return false;
  }
  
  const onItemSubmit = async () => {

    validateForm();
    if (isError) {
      alert("Validate errors please review");
      return;
    }

    var imageUrl = "###";
    if (selectedFile) {
      const formData = new FormData();
      formData.append("picture",
        selectedFile,
        selectedFile.name);
      var { url } = await postImage(formData, authContext);
      imageUrl = url;
    }
    var item = {
      name: itemName,
      producer: itemCreator,
      description: itemDetail,
      imageUrl: imageUrl,
      inventory: itemInventory,
      price: Number(itemPrice),
      options: JSON.parse(itemOptions)
    }
    //console.log(item);
    item = await postItem(item, authContext);
    setIsCreated(true);
  }
  if(isCreated) {
    return (
      <Redirect to="/"/>
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
                value={itemName}
                onChange={e => setItemName(e.target.value)}
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
                value={itemCreator}
                onChange={e => setItemCreator(e.target.value)}
                name="itemCreator"
                variant="outlined"
                fullWidth
                id="itemCreator"
                label="Creator"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={itemDetail}
                onChange={e => setItemDetail(e.target.value)}
                name="itemDetail"
                variant="outlined"
                required
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
                value={itemOptions}
                onChange={e => setItemOptions(e.target.value)}
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
                value={itemInventory}
                onChange={e => setItemInventory(e.target.value)}
                type="number"
                name="itemInventory"
                variant="outlined"
                required
                fullWidth
                id="itemInventory"
                label="Inventory"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={itemPrice}
                onChange={e => setItemPrice(e.target.value)}
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

export default ItemCreator;