import { $host } from './index'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const token = cookies.get('jwt_authorization')

class Photo {
	public async getAll(albumId: string) {
		try {
			const data = await $host.get('/info/photos', {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					albumID: albumId
				}
			})

			return data
		} catch (e) {
			console.log(e)
		}
		return
	}

	public async uploadPhotos(albumId: string, images: Array<any>) {
		// console.log(albumId)
		// console.log(images)

		try {
			const data = await $host.post(
				'/info/addPhoto',
				{
					images: images
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					},
					params: {
						albumID: albumId
					}
				}
			)
			// console.log(data)
			return data
		} catch (e) {
			console.log(e)
		}
	}
}

export default new Photo()
