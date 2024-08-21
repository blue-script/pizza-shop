import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Layout} from "./layout/layout"
import {Menu} from "./pages/menu/menu"
import {Cart} from "./pages/cart"
import {Error} from "./pages/error/error"

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
