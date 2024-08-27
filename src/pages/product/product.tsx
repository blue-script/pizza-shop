import {Await, useLoaderData, useNavigate} from "react-router-dom"
import {ProductDTO} from "../../helpers/products.dto"
import {Suspense} from "react"
import s from "./product.module.css"
import {Button} from "../../components/Button"
import {useAppDispatch} from "../../store/store"
import {cartActions} from "../../store/cart.slice"

export const Product = () => {
  const data = useLoaderData() as { data: ProductDTO }
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <>
      <Suspense fallback={<>LOADING...</>}>
        <Await resolve={data.data}>
          {({data}: { data: ProductDTO }) => (
            <div className={s.product}>
              <div className={s.head}>
                <button className={s.prev_page} onClick={() => navigate(-1)}>{"<"}</button>
                <h2 className={s.title}>{data.name}</h2>
                <Button appearance="small"
                  className={s.to_cart}
                  onClick={() => dispatch(cartActions.add(data.id))}
                >
                  <img src="/cart-icon.svg" alt="cart icon"/>
                  <span>to cart</span>
                </Button>
              </div>
              <div className={s.description}>
                <img src={data.image} alt="image pizza" className={s.image}/>
                <div className={s.text_info}>
                  <div className={s.price}>
                    Price <span>{data.price}&nbsp;₽</span>
                  </div>
                  <div className={s.rating}>
                    Rating
                    <div>
                      {data.rating}&nbsp;
                      <img src="/star-icon.svg" alt="star icon"/>
                    </div>
                  </div>
                  <div className={s.composition}>
                    <p>Composition:</p>
                    <div className={s.ingredients}>
                      {data.ingredients.map(i => {
                        return <span className={s.ingredient}>
                          -&nbsp;{i[0].toUpperCase().concat(i.slice(1))}
                        </span>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  )
}
