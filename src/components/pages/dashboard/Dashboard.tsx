import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import plusSign from './plus.png'
import CreateAlbum from '../../modal/createAlbum/CreateAlbum';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { open } from '../../../app/modalSlice/modalSlice';
import album from '../../../service/albumService'
import { update } from '../../../app/allAlbumsSlice/allAlbumsSlice';
import AlbumSummary from '../albumSummary/AlbumSummary';
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import { LOGIN_ROUTE } from '../../../utils/consts/conts';


const Container = styled.div``
const BodyContainer = styled.div``
const Header = styled.header``


const AddAlbumBtn = styled.button`
  position: fixed;
  right: 0;
  margin-right: 5em;
  padding: 1em 2em;
  background: none;
`

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const { isModalOpen } = useAppSelector(state => state.modalUpdate)
  const { id, isLoggedIn } = useAppSelector(state => state.userUpdate)
  const { albums } = useAppSelector(state => state.albumsUpdate)

  useEffect(() => {
    const fetchData = async () => {
        const data = await album.getAlbums(id)
        dispatch(update(data))
    }

    if (isLoggedIn) {
       fetchData()
    } else {
      navigate(LOGIN_ROUTE)
    }
  }, [])

  const handleAddAlbum = () => {
    dispatch(open())
   
  }
  return (
    <div>
      <Container>
        <BodyContainer>
          <HeaderContainer>
            <Header>LOGO</Header>
            <AddAlbumBtn onClick={handleAddAlbum}>
              <img src={plusSign} alt='add sign' width={"30em"} />
            </AddAlbumBtn>
          </HeaderContainer>
          {albums.length > 0
            ? albums.map(album =>
              <AlbumSummary
                location={album.location}
                albumName={album.albumName}
                id={album.albumID}
                key={album.albumName}
              />)
            : ''
          }
        </BodyContainer>
        {isModalOpen ? <CreateAlbum /> : ''}
      </Container>
    </div>
  );
};

export default Dashboard;