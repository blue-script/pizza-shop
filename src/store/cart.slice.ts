import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type CartItem = {
  id: number,
  count: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  selectors: {
    cartItems: (state) => state.items
  },
  reducers: {
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
    }
  }
})

export const cartName = cartSlice.name
export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions
export const {cartItems} = cartSlice.selectors