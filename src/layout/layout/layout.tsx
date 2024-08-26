import {NavLink, Outlet, useNavigate} from "react-router-dom"
import s from "./layout.module.css"
import {Button} from "../../components/Button"
import cn from "classnames"
import {useAppDispatch} from "../../store/store"
import {getProfile, userActions, userProfile} from "../../store/user.slice"
import {useEffect} from "react"
import {useSelector} from "react-redux"
import {cartItems} from "../../store/cart.slice"

export const Layout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useSelector(userProfile)
  const itemsInCart = useSelector(cartItems)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const logout = () => {
    dispatch(userActions.logout())
    navigate("/auth/login")
  }

  return (
    <div className={s.layout}>
      <div className={s.sidebar}>
        <div className={s.user}>
          <img className={s.avatar} src="/avatar.png" alt="avatar"/>
          <div className={s.info}>
            <span className={s.info_name}>{user?.name}</span>
            <span className={s.info_email}>{user?.email}</span>
          </div>
        </div>

        <div className={s.menu}>
          <NavLink to="/" className={({isActive}) => cn(s.link, {[s.active]: isActive})}>
            <img src="/menu-icon.svg" alt="menu icon"/>
            Menu
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => cn(s.link, {[s.active]: isActive})}>
            <img src="/cart-icon.svg" alt="cart icon"/>
            Cart
          </NavLink>
          <div>
            countItems: {itemsInCart.reduce((acc, item) => acc + item.count, 0)}
          </div>
        </div>

        <Button className={s.exit} onClick={logout}>
          <img src="/exit-icon.svg" alt="exit icon"/>
          Exit
        </Button>
      </div>
      <div className={s.content}>
        <Outlet/>
      </div>
    </div>
  )
}

