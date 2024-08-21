import {Heading} from "../../components/Heading"
import {Search} from "../../components/Search"
import s from "./menu.module.css"
import {PREFIX} from "../../helpers/API"
import {ProductsDTO} from "../../helpers/products.dto"
import {useEffect, useState} from "react"
import axios, {AxiosError} from "axios"
import {MenuList} from "./menu-list/menu-list"

export const Menu = () => {
  const [products, setProducts] = useState<ProductsDTO>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getMenu = async () => {
    try {
      setIsLoading(true)
      await new Promise<void>(resolve => setTimeout(resolve, 2000))

      const res = await axios.get<ProductsDTO>(`${PREFIX}/products`)
      setProducts(res.data)
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message)
      }
      console.error(e)

      return
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <>
      <div className={s.head}>
        <Heading>Menu</Heading>
        <Search placeholder="Enter a dish or ingredient"/>
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products}/>}
        {isLoading && <>Loading...</>}
      </div>
    </>
  )
}

