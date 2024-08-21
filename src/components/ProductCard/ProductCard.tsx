import s from "./ProductCard.module.css"
import {Link} from "react-router-dom"
import {ProductCardProps} from "./ProductCard.props"

export const ProductCard = (props: ProductCardProps) => {
  const {description, image, name, price, rating, id} = props

  return (
    <Link to={`/product/${id}`} className={s.link}>
      <div className={s.card}>
        <div className={s.head} style={{backgroundImage: `url('${image}')`}}>
          <div className={s.price}>
            {price}&nbsp;
            <span className={s.currency}>₽</span>
          </div>
          <button className={s.add_to_cart}>
            <img src="/cart-button-icon.svg" alt="cart button icon"/>
          </button>
          <div className={s.rating}>
            {rating}&nbsp;
            <img src="/star-icon.svg" alt="star icon"/>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.title}>{name}</div>
          <div className={s.description}>{description}</div>
        </div>
      </div>
    </Link>
  )
}
