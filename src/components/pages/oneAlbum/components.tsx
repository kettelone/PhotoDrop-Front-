import styled from "styled-components";

const Header = styled.header``

const Img = styled.img`
  max-height: 4em;
`
const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  padding:2em;
`
const GridContainer = styled.div`
  display: grid;
  column-gap: 1em;
  grid-template-columns: auto auto auto;
  padding: 0.5em;
`
const GridItem = styled.div`
  padding: 0.5em;
`

export { ButtonContainer,Header, GridContainer, GridItem, Img }