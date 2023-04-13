import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom"
import { HeaderContainer } from '../../commom/HeaderContainer/HeaderContainer';
import StyledButton from '../../commom/Button/Button';
import photo from '../../../service/photoService';

const Header = styled.header``
const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 2em;
`

const OneAlbum = () => {
  let { id } = useParams()
    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          const data = await photo.getAll(id)
          console.log(data)
        // dispatch(update(data))

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
    </div>
  );
};

export default OneAlbum;