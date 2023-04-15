import { $host } from './index'
import Cookies from 'universal-cookie'

import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import AwsS3 from '@uppy/aws-s3'

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
}

export default new Photo()
