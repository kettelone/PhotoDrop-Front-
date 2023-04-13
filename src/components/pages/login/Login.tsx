import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import auth from '../../../service/loginService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DASHBOARD_ROUTE } from '../../../utils/consts/conts';
import ModalAuthInvalid from '../../modal/authInvalid/AuthInvalid';
import StyledButton from '../../commom/Button/Button';
import Input from '../../commom/Input/Input';
import { update } from '../../../app/userSlice/userSlice';


const Wrapper = styled.div`
//https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  margin: auto;
`
const Fields = styled.div`
  display: flex;
  flex-direction: column;
`

const Login = () => {
  const { isLoggedIn } = useAppSelector(state => state.userUpdate)
  console.log(isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(DASHBOARD_ROUTE)
    }
  },[])

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLogin(event.target.value)
  }

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  

  const handleLogin = async () => {
    if (login && password) {
      const id = await auth.login(login, password)

      if (id) {
        console.log({id})
        dispatch(update({ id }))
        navigate(DASHBOARD_ROUTE)
      } else {
        setModalIsOpen(true)
        setTimeout(() => {
          setModalIsOpen(false)
        }, 2000)
      }
    }
  }

  return (
    <div>

    <Wrapper>
      <Container>
        <Fields>
            <Input type="text" placeholder='Login' onChange={handleLoginInput}/>
            <Input type="password" placeholder='Password' onChange={handlePasswordInput}/>
        </Fields>
        <div className="loginBtn">
          <StyledButton onClick={handleLogin}>
            Login
          </StyledButton>
        </div>
      </Container>
      </Wrapper>
      {modalIsOpen ? <ModalAuthInvalid /> : ''} 
    </div>
  );
};

export default Login;