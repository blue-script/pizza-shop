import {ProductCard} from "../../../components/ProductCard"
import {MenuListProps} from "./menu-list.props"

export const MenuList = ({products}: MenuListProps) => {

  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      name={p.name}
      description={p.ingredients.join(", ")}
      image={p.image}
      price={p.price}
      rating={p.rating}
    />
  ))
}
