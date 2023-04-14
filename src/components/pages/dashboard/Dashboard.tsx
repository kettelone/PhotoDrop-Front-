import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import plusSign from './plus.png'
import CreateAlbum from '../../modal/createAlbum/CreateAlbum';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { open } from '../../../app/modalSlice/modalSlice';
import album from '../../../service/albumService'
import { update } from '../../../app/allAlbumsSlice/allAlbumsSlice';
import AlbumSummary from '../albumSummary/AlbumSummary';
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import Spinner from '../../commom/Spinner/Spinner';
import camera from '../../../assets/cameraLogo.png'


const Container = styled.div`
overflow: auto;
background-size:cover;
`
const BodyContainer = styled.div``
const Header = styled.header``

const AlbumsContainer = styled.div`
  padding:2em 6em;
`

const AddAlbumBtn = styled.button`
  position: absolute;
  right: 0;
  margin-right: 5em;
  padding: 1em 2em;
  background: none;
  cursor: pointer;
`

const Img =styled.img`
  max-height: 4em;
`
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const { isModalOpen } = useAppSelector(state => state.modalUpdate)
  const { id} = useAppSelector(state => state.userUpdate)
  const { albums } = useAppSelector(state => state.albumsUpdate)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
    const data = await album.getAlbums(id)
      dispatch(update(data))
      setLoading(false)
    } 
    fetchData()
  }, [])

  const handleAddAlbum = () => {
    dispatch(open())
  }
  return (
    <div>
      <Container>
        <BodyContainer>
          <HeaderContainer>
            <Header>
             <Img src={camera} alt="camera" />
            </Header>
            <AddAlbumBtn onClick={handleAddAlbum}>
              <img src={plusSign} alt='add sign' width={"30em"} />
            </AddAlbumBtn>
          </HeaderContainer>
          <AlbumsContainer>
            {loading
              ? <Spinner />
              : albums.length > 0
                ? albums.map(album =>
                  <AlbumSummary
                    location={album.location}
                    albumName={album.albumName}
                    id={album.albumID}
                    key={album.albumName}
                  />)
                : ''

            }
          </AlbumsContainer>
        </BodyContainer>
        {isModalOpen ? <CreateAlbum /> : ''}
      </Container>
    </div>
  );
};

export default Dashboard;