import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlbumAction } from './interface'
import { RootState } from '../store'

const initialState: { albums: Array<any> } = {
	albums: []
}

export const albumSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {
		update: (state, { payload }: PayloadAction<Array<AlbumAction>>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.albums = [ ...payload ]
		}
	}
})

export const { update } = albumSlice.actions

export const selectAlbums = (state: RootState) => state.albumsUpdate

export default albumSlice.reducer
