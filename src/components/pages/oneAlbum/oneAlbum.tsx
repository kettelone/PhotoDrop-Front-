import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom"
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import photo from '../../../service/photoService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { update } from '../../../app/oneAlbumSlice/oneAlbumSlice';
import Spinner from '../../commom/Spinner/Spinner';
import { convertBase64 } from '../../../utils/consts/convertBase64';
import photoService from '../../../service/photoService'; 

const Header = styled.header``
const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 2em;
`

const GridContainer = styled.div`
  display: grid;
  column-gap: 1em;
  grid-template-columns: auto auto auto;
  padding: 0.5em;
`
const GridItem = styled.div`
  padding: 0.5em;
`


const OneAlbum = () => {
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false)
  const { photos } = useAppSelector(state => state.oneAlbumUpdate)
  const { id } = useParams()
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
  
  const handleChange = (event:any) => {
    const input = event.target.files;
    if (input) {
      setFiles(input)
    }
  }

  const handleUpload = async () => {
    setUploadLoading(true)
    if (files) {
      const promises = Array.from(files).map(file => convertBase64(file))
      const base64 = await Promise.all(promises)
      const imageObject: Array<any> = []
      base64.forEach(el => imageObject.push({ "base64image": el }))
      if (id) {
        await photoService.uploadPhotos(id, imageObject)
      }
      setUploadLoading(false)
    }
  }

  return (
    
    <div>
      <HeaderContainer>
        <Header>
          LOGO
        </Header>
      </HeaderContainer>
      <ButtonContainer>
        {uploadLoading
          ? <Spinner />
          : <div>
              <input type="file" multiple onChange={handleChange} />
              <button onClick={handleUpload}>Upload</button>
          </div>
        }
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