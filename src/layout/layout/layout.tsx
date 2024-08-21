import {NavLink, Outlet} from "react-router-dom"
import s from "./layout.module.css"
import {Button} from "../../components/Button"
import cn from "classnames"

export const Layout = () => {
  return (
    <div className={s.layout}>
      <div className={s.sidebar}>
        <div className={s.user}>
          <img className={s.avatar} src="/avatar.png" alt="avatar"/>
          <div className={s.info}>
            <span className={s.info_name}>name</span>
            <span className={s.info_email}>email</span>
          </div>
        </div>

        <div className={s.menu}>
          <NavLink to="/" className={({isActive}) =>  cn(s.link, {[s.active]: isActive})}>
            <img src="/menu-icon.svg" alt="menu icon"/>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({isActive}) =>  cn(s.link, {[s.active]: isActive})}>
            <img src="/cart-icon.svg" alt="cart icon"/>
            Cart
          </NavLink>
        </div>

        <Button className={s.exit}>
          <img src="/exit-icon.svg" alt="exit icon"/>
          Exit
        </Button>
      </div>
      <div className={s.right_side}>
        <Outlet/>
      </div>
    </div>
  )
}

