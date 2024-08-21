import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Layout} from "./layout/layout"
import {Menu} from "./pages/menu/menu"
import {Cart} from "./pages/cart"
import {Error} from "./pages/error/error"
import {Product} from "./pages/product"
import axios from "axios"
import {PREFIX} from "./helpers/API"
import {ProductDTO} from "./helpers/products.dto"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Menu/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/product/:id",
        element: <Product/>,
        loader: async ({params}) => {
          const {data} = await axios.get<ProductDTO>(`${PREFIX}/products/${params.id}`)

          return data
        }
      }
    ]
  },
  {
    path: "*",
    element: <Error/>
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
