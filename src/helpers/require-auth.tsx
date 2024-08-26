import {ReactNode} from "react"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {userGetJwt} from "../store/user.slice"


export const RequireAuth = ({children}: { children: ReactNode }) => {
  const jwt = useSelector(userGetJwt)

  if (!jwt) {
    return <Navigate to="/auth/login" replace/>
  }

  return children
}
