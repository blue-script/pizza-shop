import {AnyAction, configureStore, Dispatch, Middleware} from "@reduxjs/toolkit"
import {JWT_PERSISTENT_STATE, userName, userReducer} from "./user.slice"
import {useDispatch} from "react-redux"
import {saveState} from "./storage"
import {CART_PERSISTENT_STATE, cartName, cartReducer} from "./cart.slice"

type MiddlewareAPI = {
  getState: () => { user: ReturnType<typeof userReducer>; cart: ReturnType<typeof cartReducer> };
  dispatch: Dispatch<AnyAction>;
};

const localStorageMiddleware: Middleware<object, ReturnType<MiddlewareAPI["getState"]>> = storeAPI => next => action => {
  const result = next(action)
  const state = storeAPI.getState()

  saveState({jwt: state.user.jwt}, JWT_PERSISTENT_STATE)
  saveState(state.cart, CART_PERSISTENT_STATE)

  return result
}

export const store = configureStore({
  reducer: {
    [userName]: userReducer,
    [cartName]: cartReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware)
})

// store.subscribe(() => {
//   saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE)
//   saveState(store.getState().cart, CART_PERSISTENT_STATE)
// })

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch<AppDispatch>