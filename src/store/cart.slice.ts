import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {loadState} from "./storage"

export const CART_PERSISTENT_STATE = "cartData"

type CartItem = {
  id: number,
  count: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) || {
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    cartItems: (state) => state.items
  },
  reducers: {
    empty: (state) => {
      state.items = []
    },
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(el => el.id === action.payload)
      if (!existed) {
        state.items.push({id: action.payload, count: 1})

        return
      }
      state.items.map(el => {
        if (el.id === action.payload) {
          el.count += 1
        }

        return el
      })
    },
    decrease: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(el => el.id === action.payload)
      if (!existed) {
        return
      }
      if (existed.count === 1) {
        state.items = state.items.filter(el => el.id !== action.payload)

        return
      }
      state.items.map(el => {
        if (el.id === action.payload) {
          el.count -= 1
        }

        return el
      })
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(el => el.id !== action.payload)
    }
  }
})

export const cartName = cartSlice.name
export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions
export const {cartItems} = cartSlice.selectors