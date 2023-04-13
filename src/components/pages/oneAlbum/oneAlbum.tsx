import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom"
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import StyledButton from '../../commom/Button/Button';
import photo from '../../../service/photoService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { update } from '../../../app/oneAlbumSlice/oneAlbumSlice';

const Header = styled.header``
const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 2em;
`

const OneAlbum = () => {
  const dispatch = useAppDispatch()
  const { photos } =useAppSelector(state => state.oneAlbumUpdate)
  let { id } = useParams()
    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          const data = await photo.getAll(id)
        dispatch(update(data?.data))
        }
      }
      fetchData()
    }, [])

  return (
    
    <div>
      <HeaderContainer>
        <Header>
          LOGO
        </Header>
      </HeaderContainer>
      <ButtonContainer>
        <StyledButton>
          Upload Photos
        </StyledButton>
      </ButtonContainer>
      {photos && photos.length > 0
        ? photos.map(photo =>
        <div key={photo.photoID}>
          {photo.photoID}
        </div>)
        :''
      }
    </div>
  );
};

export default OneAlbum;