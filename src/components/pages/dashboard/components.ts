import styled from 'styled-components'

const Container = styled.div`
	overflow: auto;
	background-size: cover;
`
const BodyContainer = styled.div``
const Header = styled.header``

const AlbumsContainer = styled.div`padding: 2em 6em;`

const AddAlbumBtn = styled.button`
	position: absolute;
	right: 0;
	margin-right: 5em;
	padding: 1em 2em;
	background: none;
	cursor: pointer;
	&:hover {
		background-color: #64606050;
	}
`

const Img = styled.img`max-height: 4em;`

export { Container, BodyContainer, Header, AlbumsContainer, AddAlbumBtn, Img }
