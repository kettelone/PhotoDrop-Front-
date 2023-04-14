import { $host } from './index'
import Cookies from 'universal-cookie'
import axios from 'axios'

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

	public async uploadPhotos(albumId: string, images: Array<any>, files: any) {
		console.log(files)
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

			const formData = new FormData()
			formData.append(
				'Policy',
				'eyJleHBpcmF0aW9uIjoiMjAyMy0wNC0xNFQyMjo0NjoyNFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MF0seyJhY2wiOiJidWNrZXQtb3duZXItZnVsbC1jb250cm9sIn0seyJrZXkiOiJvcmlnaW5hbC90ZXN0QWNjb3VudC9iNTlhZWZhOS05MjBiLTRiYTEtYjIwMS01ZjA5YTA1OGZiMTAvMGFmMDRjOTUtNTM0My00Y2I2LTk0NWMtYTEwZDA4MzU0ZDExLmpwZyJ9LHsiYnVja2V0IjoicGhvdG9kcm9wYnVja2V0a3J5diJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUE1TkNJSlhRR1NRVVZENzRPLzIwMjMwNDE0L2V1LWNlbnRyYWwtMS9zMy9hd3M0X3JlcXVlc3QifSx7IlgtQW16LURhdGUiOiIyMDIzMDQxNFQyMjQxMjRaIn1dfQ=='
			)
			formData.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256')
			formData.append(
				'X-Amz-Credential',
				'AKIA5NCIJXQGSQUVD74O/20230414/eu-central-1/s3/aws4_request'
			)
			formData.append('X-Amz-Date', '20230414T224124Z')
			formData.append(
				'X-Amz-Signature',
				'241b78e3c2f7d975b3391b438caaa7fabfd17015981e81f9d9365b2e024ba05c'
			)
			formData.append('acl', 'bucket-owner-full-control')
			formData.append('bucket', 'photodropbucketkryv')
			formData.append(
				'key',
				'original/testAccount/b59aefa9-920b-4ba1-b201-5f09a058fb10/0af04c95-5343-4cb6-945c-a10d08354d11.jpg'
			)
			formData.append('file', files[0])

			let response = await axios.post(
				'https://s3.eu-central-1.amazonaws.com/photodropbucketkryv',
				{
					method: 'POST',
					body: formData
				}
			)

			console.log(data)
		} catch (e) {
			console.log(e)
		}
	}
}

export default new Photo()
