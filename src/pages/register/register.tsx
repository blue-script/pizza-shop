import s from "./register.module.css"
import {NavLink, useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../store/store"
import {useSelector} from "react-redux"
import {
  registerGetErrorMessage,
  userActions,
  userAsyncThunk,
  userGetJwt
} from "../../store/user.slice"
import {FormEvent, useEffect} from "react"
import {Heading} from "../../components/Heading"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"

export type RegistrForm = {
  email: {
    value: string
  },
  password: {
    value: string
  },
  name: {
    value: string
  }
}

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const jwt = useSelector(userGetJwt)
  const registerErrorMessage = useSelector(registerGetErrorMessage)

  useEffect(() => {
    if (jwt) {
      navigate("/")
    }
  }, [jwt, navigate])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(userActions.clearRegisterError())
    const target = e.target as typeof e.target & RegistrForm
    dispatch(userAsyncThunk.register({
      email: target.email.value,
      password: target.password.value,
      name: target.name.value
    }))
  }

  return (
    <div className={s.register}>
      <Heading>Register</Heading>
      {registerErrorMessage && <div className={s.error}>{registerErrorMessage}</div>}
      <form onSubmit={submit} className={s.form}>
        <div className={s.field}>
          <label htmlFor="email">Email</label>
          <Input placeholder="Email" name="email" id="email"/>
        </div>
        <div className={s.field}>
          <label htmlFor="password">Password</label>
          <Input placeholder="Password" name="password" id="password" type="password"/>
        </div>
        <div className={s.field}>
          <label htmlFor="name">Name</label>
          <Input placeholder="Name" name="name" id="name"/>
        </div>
        <Button appearance="big" type="submit">Register</Button>
      </form>

      <div className={s.footer}>
        <span>Have account?</span>
        <NavLink to="/auth/login">Login</NavLink>
      </div>
    </div>
  )
}
