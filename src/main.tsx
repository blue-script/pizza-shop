import {lazy, StrictMode, Suspense} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import {createBrowserRouter, defer, RouterProvider} from "react-router-dom"
import {Layout} from "./layout/layout"
import {Cart} from "./pages/cart"
import {Error as ErrorPage} from "./pages/error"
import {Product} from "./pages/product"
import axios from "axios"
import {PREFIX} from "./helpers/API"
import {ProductDTO} from "./helpers/products.dto"
import {AuthLayout} from "./layout/auth"
import {Login} from "./pages/login"
import {Register} from "./pages/register"
import {RequireAuth} from "./helpers/require-auth"
import {Provider} from "react-redux"
import {store} from "./store/store"

const Menu = lazy(() => import("./pages/menu"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout/></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<>LOADING...</>}><Menu/></Suspense>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/product/:id",
        element: <Product/>,
        errorElement: <>Error</>,
        loader: async ({params}) => {
          return defer({
            data: new Promise(resolve => {
              setTimeout(() => {
                axios.get<ProductDTO>(`${PREFIX}/products/${params.id}`).then(data => resolve(data))
              }, 1000)
            })
          })
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
