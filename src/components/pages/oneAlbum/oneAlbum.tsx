import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom"
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import photo from '../../../service/photoService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { update } from '../../../app/oneAlbumSlice/oneAlbumSlice';
import Spinner from '../../commom/Spinner/Spinner';
import UploadPhoto from '../../modal/uploadPhoto/UploadPhoto';
import camera from '../../../assets/cameraLogo.png'

const Header = styled.header``

const Img = styled.img`
  max-height: 4em;
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
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      <HeaderContainer>
        <Header>
          <Img src={camera} alt="camera" />
        </Header>
      </HeaderContainer>
     < UploadPhoto />
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