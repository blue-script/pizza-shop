import {useLoaderData} from "react-router-dom"
import {ProductDTO} from "../../helpers/products.dto"

export const Product = () => {
  const data = useLoaderData() as ProductDTO

  return (
    <div>
      Product - {data.name}
    </div>
  )
}
