import { $host } from './index'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Photo {
	public async getAll(albumId: string) {
		const token = cookies.get('jwt_authorization')
		try {
			const data = await $host.get('/info/photos', {
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
}

export default new Photo()
