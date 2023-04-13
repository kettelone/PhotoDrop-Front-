import React, { useEffect } from 'react';
import styled from 'styled-components';
import plusSign from './plus.png'
import CreateAlbum from '../../modal/createAlbum/CreateAlbum';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { open } from '../../../app/modalSlice/modalSlice';
import album from '../../../service/albumService'
import { update } from '../../../app/allAlbumsSlice/allAlbumsSlice';
import AlbumSummary from '../albumSummary/AlbumSummary';
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';


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

  useEffect(() => {
    const fetchData = async () => {
      const data = await album.getAlbums(id)
      dispatch(update(data))
    }

    fetchData()
  }, [])
  
  const { isModalOpen } = useAppSelector(state => state.modalUpdate)
  const { id } = useAppSelector(state => state.userUpdate)
  const { albums } = useAppSelector(state => state.albumUpdate)

  const handleAddAlbum = () => {
    dispatch(open())
   
  }
  return (
    <Container>
      <BodyContainer>
        <HeaderContainer>
          <Header>LOGO</Header>
          <AddAlbumBtn onClick={handleAddAlbum}>
            <img src={plusSign} alt='add sign'width={"30em"}/>
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
      { isModalOpen ? <CreateAlbum /> :'' }
    </Container>
  );
};

export default Dashboard;