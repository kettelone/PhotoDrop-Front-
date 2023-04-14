import { $host } from './index'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Auth {
	public async login(login: string, password: string) {
		try {
			const response = await $host.post('/auth/login/', {
				login: login,
				password: password
			})
			const { accessToken, id } = response.data

			//Set cookie
			cookies.set('jwt_authorization', accessToken)
			return id
		} catch (e) {
			return false
		}
	}
}

export default new Auth()
