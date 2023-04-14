import React, { useState, useRef } from 'react';
import Spinner from '../../commom/Spinner/Spinner';
import photoService from '../../../service/photoService';
import { useParams } from "react-router-dom"
import styled from 'styled-components';
import StyledButton from '../../commom/Button/Button';

const Container = styled.div`
  display:flex;
  justify-content:center;
`

const Input = styled.input`
  display: none;
`

const UploadPhoto = () => {
  
  const [uploadLoading, setUploadLoading] = useState(false)
  const { id } = useParams()
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current != null) { 
      hiddenFileInput.current.click();
    }
  };
/*
https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
*/
 
  const handleUpload = async (event: any) => {

    const files = event.target.files;
    if (files && id) {
      //@ts-ignore
      const images = Array.from(files).map(file => file.name)
      await photoService.uploadPhotos(id, images,files)
      setUploadLoading(false)
    }
  }

  return (
    <Container>
      {
        uploadLoading
        ? <Spinner />
          : <div>
            <StyledButton 
              // margin="2em"
              onClick={handleClick}>Upload photo</StyledButton>
            <Input
              type="file"
              name="image"
              multiple
              ref={hiddenFileInput}
              onChange={handleUpload}
            />
        </div>
      }
    </Container>  
  );
};

export default UploadPhoto;