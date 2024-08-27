import {ProductDTO} from "../../helpers/products.dto"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {cartActions, cartItems} from "../../store/cart.slice"
import s from "./cart.module.css"
import {CartItem} from "../../components/CartItem"
import axios from "axios"
import {Heading} from "../../components/Heading"
import {PREFIX} from "../../helpers/API"
import {Button} from "../../components/Button"
import {userGetJwt} from "../../store/user.slice"
import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../store/store"

const DELIVERY_FEE = 169

export const Cart = () => {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const items = useSelector(cartItems)
  const jwt = useSelector(userGetJwt)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const amount = items
    .map(i => {
      const product = products.find(p => p.id === i.id)
      if (!product) return 0

      return i.count * product.price
    })
    .reduce((acc, cur) => acc + cur, 0)

  const checkout = async () => {
    await axios.post((`${PREFIX}/order`), {products: items}, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    dispatch(cartActions.empty())
    navigate("/success")
  }

  const getItem = async (id: number) => {
    const {data} = await axios.get<ProductDTO>(`${PREFIX}/products/${id}`)

    return data
  }

  const loadAllItems = async () => {
    const res = await Promise.all(items.map(i => getItem(i.id)))
    setProducts(res)
  }

  useEffect(() => {
    loadAllItems()
  }, [items])

  return (
    <div className={s.cart}>
      <Heading className={s.heading_bottom}>Cart</Heading>
      <div className={s.cart_items}>
        {
          items.map(i => {
            const product = products.find(el => el.id === i.id)
            if (!product) return

            return <CartItem key={i.id} count={i.count} {...product} />
          })
        }
      </div>
      <div className={s.money}>
        <div className={s.monetary_item}>
          <div className={s.text}>Amount of goods</div>
          <div className={s.price}>{amount}&nbsp;<span>₽</span></div>
        </div>
        <div className={s.monetary_item}>
          <div className={s.text}>Delivery</div>
          <div className={s.price}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
        </div>
        <div className={s.monetary_item}>
          <div className={s.text}>Total <span
            className={s.total_count}>({items.reduce((acc, cur) => acc + cur.count, 0)})</span>
          </div>
          <div className={s.price}>{amount + DELIVERY_FEE}&nbsp;<span>₽</span></div>
        </div>
      </div>
      <div className={s.checkout}>
        <Button appearance="big" onClick={checkout}>order</Button>
      </div>
    </div>
  )
}
