import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import AwsS3 from '@uppy/aws-s3';
import photoService from '../../../service/photoService';
import Spinner from '../../commom/Spinner/Spinner';
import camera from '../../../assets/cameraLogo.png'
import photo from '../../../service/photoService';
import StyledButton from '../../commom/Button/Button';
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { update } from '../../../app/oneAlbumSlice/oneAlbumSlice';
import { Header, GridContainer, GridItem, Img, ButtonContainer } from './components';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

let idScope: string | undefined;

const uppy = new Uppy({
  restrictions: { 
    maxFileSize: 31457280, 
    maxNumberOfFiles: 20,
    minNumberOfFiles: null, 
    allowedFileTypes: ['image/*']
  },
})
  .use(Dashboard,
    {
      inline: false,
      target: '#root',
      trigger: '.uppyDashboard',
      proudlyDisplayPoweredByUppy: false,
      width: "200px",
      height:'200px'
    }
  )
  .use(AwsS3, {   
    //@ts-ignore
    async getUploadParameters(files) { 
      try {
        //@ts-ignore
        const response = await photoService.uploadPhotos(idScope, [files.data.name])
        const { url, fields } = response
        return {
          method: "POST",
          url: url,
          fields: fields
        }
      } catch (e) {
        console.log(e)
        }
    } 
  });

const OneAlbum = () => {
  const [loading, setLoading] = useState(false);
  const { photos } = useAppSelector(state => state.oneAlbumUpdate)
  const { id } = useParams()
  idScope = id
  const dispatch = useAppDispatch()

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        if (id) {
          const data = await photo.getAll(id)
          dispatch(update(data?.data))
          setLoading(false)
        }
      }
      fetchData()
    }, [])
  
  return (
    <div className='someDiv'> 
      <HeaderContainer>
        <Header>
          <Img src={camera} alt="camera" />
        </Header>
      </HeaderContainer>
      <ButtonContainer>
        <StyledButton
          type='button'
          className='uppyDashboard'
          onClick={(event)=>event.preventDefault()}
        >Upload photos</StyledButton>
      </ButtonContainer>
      {
        loading 
          ? <Spinner/>
          : <GridContainer>
            {
              photos && photos.length > 0
                ? photos.map(photo =>
                  <GridItem key={photo.url}>
                    <img src={photo.url} alt="photo" />
                  </GridItem>)
                : ''
            }
          </GridContainer>
      }
    </div>
  );
};

export default OneAlbum;