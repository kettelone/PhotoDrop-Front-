import React from 'react'
import styled from 'styled-components'
import albumIcon from './AlbumIcon.png'
import { Link } from 'react-router-dom'



const AlbumContainer = styled.div`
  display: flex;
   border: 1px solid black;
   margin: 2em 4em;
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
interface Album { albumName: string, location: string , id:string }

const AlbumSummary = (props: Album) => {

	return (
		<Link to={`/album/${props.id}`}>
			<AlbumContainer>
				<IconContainer>
					<img src={albumIcon} alt="album icon" />
				</IconContainer>
			<FieldsContainer>
				<Field>{props.albumName}</Field>
				<Field>{props.location}</Field>
			</FieldsContainer>
			</AlbumContainer>
		</Link>
	)
}

export default AlbumSummary
