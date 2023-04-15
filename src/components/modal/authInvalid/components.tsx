import styled from "styled-components";

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 22em;
  height: 2.5em;
  border-radius: 5px;
  background-color:rgb(257 70 79);
  color:white;
  margin-top: 1em;
  position: fixed;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 2s;
`

export {Container}