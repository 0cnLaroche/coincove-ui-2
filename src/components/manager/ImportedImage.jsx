import React from 'react';
import { Container, CardMedia } from '@material-ui/core';

// Creates 
const ImportedImage = (props) => {
    const { dataUrl } = props;
    return (
      <Container maxWidth="sm">
        {dataUrl ?
          <CardMedia component="img" image={dataUrl} alt="user imported"/>
          : <p>no file selected</p>
        }
      </Container>
    )
}
export default ImportedImage;