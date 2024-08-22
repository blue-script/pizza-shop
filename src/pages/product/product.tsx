import {Await, useLoaderData} from "react-router-dom"
import {ProductDTO} from "../../helpers/products.dto"
import {Suspense} from "react"

export const Product = () => {
  const data = useLoaderData() as { data: ProductDTO }

  return (
    <>
      <Suspense fallback={<>LOADING...</>}>
        <Await resolve={data.data}>
          {({data}: { data: ProductDTO }) => (
            <>Product - {data.name}</>
          )}
        </Await>
      </Suspense>
    </>
  )
}
