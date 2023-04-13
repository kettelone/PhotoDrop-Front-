import { $host } from './index'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Album {
	public async getAlbums(id: number) {
		const token = cookies.get('jwt_authorization')
		try {
			const { data } = await $host.get('/info/albums', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			return data
		} catch (e) {
			console.log(e)
		}
		return
	}

	public async createAlbum(name: string, location: string, date: string) {
		const token = cookies.get('jwt_authorization')
		try {
			await $host.post('/info/addAlbum', null, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					albumName: name,
					location: location,
					date: date
				}
			})
		} catch (e) {
			console.log(e)
		}
	}
}

export default new Album()
