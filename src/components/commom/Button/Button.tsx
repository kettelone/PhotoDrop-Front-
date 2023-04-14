import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 26.5em;
  height: 2.5em;
  border-radius: 5px;
  background-color: #321acd;
  color: white;
  margin: ${props => props.margin || ""};
  cursor: pointer;
`

export default StyledButton;