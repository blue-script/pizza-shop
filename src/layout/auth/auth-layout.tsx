import s from "./auth-layout.module.css"
import {Outlet} from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className={s.auth_layout}>
      <div className={s.logo}>
        <img src="/logo.svg" alt="logo company"/>
      </div>
      <div className={s.content}>
        <Outlet/>
      </div>
    </div>
  )
}
