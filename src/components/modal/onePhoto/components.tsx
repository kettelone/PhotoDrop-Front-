import styled from "styled-components";

const Wrapper = styled.div`
  display:none;
  background-color: #00000080;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:10;
  height:100vh;
`

const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:100%;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
`
export { Wrapper, Container }