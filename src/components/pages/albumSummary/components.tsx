import styled from "styled-components";

const AlbumContainer = styled.div`
  display: flex;
   border: 1px solid black;
   margin: 2em 0em;
   padding: 1em 2em;
`

const IconContainer = styled.div`
`
const FieldsContainer = styled.div`
  padding:0 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Field = styled.div`
  padding: 0.5em;
`

export {AlbumContainer, IconContainer, FieldsContainer, Field}