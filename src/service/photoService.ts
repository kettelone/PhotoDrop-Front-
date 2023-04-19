import { $host } from './index'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const token = cookies.get('jwt_authorization')

class Photo {
	public async uploadPhotos(albumId: string, images: Array<any>) {
		try {
			const data = await $host.post(
				'/info/addPhoto',
				{
					imageNames: images
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
			return data.data[0]
		} catch (e) {
			console.log(e)
		}
	}

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

	public async getOne(photoID: string) {
		try {
			const image = await $host.get('/info/getPhoto', {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					photoID: photoID
				}
			})
			return image.data
		} catch (e) {}
	}

	public async addPerson(photoID: string, phoneNumbers: string) {
		try {
			const phoneArr = phoneNumbers.trim().split(/[^\d]+/)
			const response = await $host.post(
				'/info/addUser',
				{
					phones: phoneArr
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					},
					params: {
						photoID: photoID
					}
				}
			)
			return response
		} catch (e) {}
	}
}

export default new Photo()
