import s from "./CartItem.module.css"
import {useAppDispatch} from "../../store/store"
import {MouseEvent} from "react"
import {cartActions} from "../../store/cart.slice"
import {CartItemProps} from "./CartItem.props"

export const CartItem = (props: CartItemProps) => {
  const {image, name, price, id, count} = props
  const dispatch = useAppDispatch()

  const increase = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(cartActions.add(id))
  }

  const decrease = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(cartActions.decrease(id))
  }

  const remove = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(cartActions.remove(id))
  }

  return (
    <div className={s.cart_item}>
      <div className={s.image} style={{backgroundImage: `url('${image}')`}}/>
      <div className={s.text_info}>
        <span className={s.name}>{name}</span>
        <span className={s.price}>
          {price}&nbsp;₽
        </span>
      </div>

      <div className={s.action}>
        <button className={s.minus} onClick={decrease}>
          <img src="/minus-icon.svg" alt="decrease"/>
        </button>
        <span className={s.number}>{count}</span>
        <button className={s.plus} onClick={increase}>
          <img src="/plus-icon.svg" alt="increase"/>
        </button>
        <button className={s.remove} onClick={remove}>
          <img src="/delete-icon.svg" alt="remove"/>
        </button>
      </div>
    </div>
  )
}