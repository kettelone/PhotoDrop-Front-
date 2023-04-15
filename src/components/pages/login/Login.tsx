import React, { useState, useEffect } from 'react';
import auth from '../../../service/loginService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DASHBOARD_ROUTE } from '../../../utils/consts/conts';
import ModalAuthInvalid from '../../modal/authInvalid/AuthInvalid';
import StyledButton from '../../commom/Button/Button';
import Input from '../../commom/Input/Input';
import { update } from '../../../app/userSlice/userSlice';
import Spinner from '../../commom/Spinner/Spinner';
import { Wrapper, Container, Fields } from './components';

const Login = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true)
      const id = await auth.login(login, password)
      if (id) {
        dispatch(update({ id }))
        navigate(DASHBOARD_ROUTE)
      } else {
        setModalIsOpen(true)
        setTimeout(() => {
          setModalIsOpen(false)
        }, 2000)
      }
      setLoading(false)
    }
  }

  return (
    <div>
      {
        loading
        ?
        <Spinner/>
        :
        <div>
          <Wrapper>
            <Container>
              <Fields>
                <Input type="text" placeholder='Login' onChange={handleLoginInput} />
                <Input type="password" placeholder='Password' onChange={handlePasswordInput} />
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
      }
    </div>
  );
};

export default Login;