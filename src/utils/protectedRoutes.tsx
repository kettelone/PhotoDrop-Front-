import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

export const cookies = new Cookies()

import {
	DASHBOARD_ROUTE,
	LOGIN_ROUTE
} from './consts'

const ProtectedRoute = ({ children }: any) => {
	const location = useLocation()
	let tokenValid = false
	if (cookies.get('jwt_auth')) {
		const token = cookies.get('jwt_auth')
		try {
			const { exp, iat }: { exp: number; iat: number } = jwtDecode(token)
			// the token has to be refreshed every 6 hours as presigned url is valid for 6 hours as well
			tokenValid = Date.now() < exp * 1000
			if (!tokenValid) {
				return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
			} else if ( tokenValid && location.pathname === LOGIN_ROUTE) {
				return (
					<Navigate to={DASHBOARD_ROUTE} state={{ from: location }} replace />
				)
			} else {
				return children
			}
		} catch (e) {
			console.log(e)
		}
	} else if (!cookies.get('jwt_auth')) {
		return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
	}
}

export default ProtectedRoute
