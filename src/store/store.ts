import {configureStore} from "@reduxjs/toolkit"
import {JWT_PERSISTENT_STATE, userName, userReducer} from "./user.slice"
import {useDispatch} from "react-redux"
import {saveState} from "./storage"
import {cartName, cartReducer} from "./cart.slice"

export const store = configureStore({
  reducer: {
    [userName]: userReducer,
    [cartName]: cartReducer
  }
})

store.subscribe(() => {
  saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE)
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch<AppDispatch>