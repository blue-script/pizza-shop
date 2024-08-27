import {Heading} from "../../components/Heading"
import {Search} from "../../components/Search"
import s from "./menu.module.css"
import {PREFIX} from "../../helpers/API"
import {ProductsDTO} from "../../helpers/products.dto"
import {ChangeEvent, useEffect, useState} from "react"
import axios, {AxiosError} from "axios"
import {MenuList} from "./menu-list/menu-list"

const Menu = () => {
  const [products, setProducts] = useState<ProductsDTO>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const getMenu = async (name: string) => {
    try {
      setIsLoading(true)
      await new Promise<void>(resolve => setTimeout(resolve, 500))

      const res = await axios.get<ProductsDTO>(`${PREFIX}/products`, {
        params: {
          name
        }
      })
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
    getMenu(search)
  }, [search])

  return (
    <>
      <div className={s.head}>
        <Heading>Menu</Heading>
        <Search placeholder="Enter a dish or ingredient" value={search}
          onChange={updateFilter}/>
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products}/>}
        {isLoading && <>Loading...</>}
        {!isLoading && products.length === 0 && <>No dishes found for your request</>}
      </div>
    </>
  )
}

export default Menu