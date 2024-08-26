import s from "./login.module.css"
import {Heading} from "../../components/Heading"
import {NavLink, useNavigate} from "react-router-dom"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"
import {FormEvent, useEffect} from "react"
import {useAppDispatch} from "../../store/store"
import {userActions, userAsyncThunk, userGetErrorMessage, userGetJwt} from "../../store/user.slice"
import {useSelector} from "react-redux"

export type LoginForm = {
  email: {
    value: string
  },
  password: {
    value: string
  },
}

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const jwt = useSelector(userGetJwt)
  const loginErrorMessage = useSelector(userGetErrorMessage)

  useEffect(() => {
    if (jwt) {
      navigate("/")
    }
  }, [jwt, navigate])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(userActions.clearLoginError())
    const target = e.target as typeof e.target & LoginForm
    await sendLogin(target.email.value, target.password.value)
  }

  const sendLogin = async (email: string, password: string) => {
    dispatch(userAsyncThunk.login({email, password}))
  }

  return (
    <div className={s.login}>
      <div className={s.test_data}>
        <span>Test data</span>
        <span>login: a@gmail.com</span>
        <span>password: 123</span>
      </div>
      <Heading>Login</Heading>
      {loginErrorMessage && <div className={s.error}>{loginErrorMessage}</div>}
      <form onSubmit={submit} className={s.form}>
        <div className={s.field}>
          <label htmlFor="email">Email</label>
          <Input placeholder="Email" name="email" id="email"/>
        </div>
        <div className={s.field}>
          <label htmlFor="password">Password</label>
          <Input placeholder="Password" name="password" id="password" type="password"/>
        </div>
        <Button appearance="big" type="submit">Login</Button>
      </form>

      <div className={s.footer}>
        <span>No account?</span>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  )
}
