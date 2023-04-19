import React, {useState} from 'react';
import StyledButton from '../../commom/Button/Button';
import Input from '../../commom/Input/Input';
import album from '../../../service/albumService'
import closeIcon from './close.png'
import { useAppDispatch } from '../../../app/hooks';
import { close } from '../../../app/modalSlice/modalSlice';
import Spinner from '../../commom/Spinner/Spinner';
import { CloseBtn, InputContainer, Header, HeaderContainer, Wrapper, Container } from './components'

const CreateAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const dispatch = useAppDispatch()

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setLocation(event.target.value)
  }
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setDate(event.target.value)
  }

  const handleSave = async () => {
    setLoading(true)
    if (name && location && date) {
      const response = await album.createAlbum(name, location, date)
      console.log(response)
      setName('')
      setLocation('')
      setDate('')
      setLoading(false)
      dispatch(close())
      //TO DO: handle the error(album was not saved, same album already exist)
    }
  }
  const closeModal = () => {
    dispatch(close())
  }
  return (
    <Wrapper>
      {loading
        ?<Spinner/>
        : <Container>
          <HeaderContainer>
            <Header>LOGO</Header>
            <CloseBtn onClick={closeModal}>
              <img src={closeIcon} alt='close' width={'20px'} />
            </CloseBtn>
          </HeaderContainer>
          <InputContainer>
            <Input
              placeholder='Name'
              type="text"
              name="name"
              required
              onChange={handleName}
            />
            <Input
              placeholder='Location'
              type="text"
              name="location"
              required
              onChange={handleLocation}
            />
            <Input
              placeholder='Datapicker'
              type="date"
              name="date"
              required
              onChange={handleDate}
            />
            <StyledButton
              type="button"
              onClick={handleSave}>
              Save
            </StyledButton>
          </InputContainer>
        </Container>
      }
    </Wrapper>
  );
};

export default CreateAlbum;