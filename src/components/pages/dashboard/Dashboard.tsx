import React, { useEffect, useState } from 'react';
import plusSign from './plus.png';
import { v4 as uuidv4 } from 'uuid';
import CreateAlbum from '../../modal/createAlbum/CreateAlbum';
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { open } from '../../../app/modalSlice/modalSlice';
import album from '../../../service/albumService'
import { update } from '../../../app/allAlbumsSlice/allAlbumsSlice';
import AlbumSummary from '../../commom/albumSummary/AlbumSummary';
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import Spinner from '../../commom/Spinner/Spinner';
import camera from '../../../assets/cameraLogo.png'
import { Container, BodyContainer, Header, AlbumsContainer, AddAlbumBtn, Img, PlusSpan } from './components';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { isModalOpen } = useAppSelector(state => state.modalUpdate)
  const { id } = useAppSelector(state => state.userUpdate)
  const { albums,newAlbum } = useAppSelector(state => state.albumsUpdate)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    document.getElementById('select-file-button')?.classList.remove("show")
      setLoading(true)
      const fetchData = async () => {
        const data = await album.getAlbums(id)
        dispatch(update(data))
        setLoading(false)
      }
      fetchData()

  }, [newAlbum])

  

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
                <PlusSpan>+</PlusSpan>
                {/* <img src={plusSign} alt='add sign' width={"30em"} /> */}
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
                      key={uuidv4()}
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