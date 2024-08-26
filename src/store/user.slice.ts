import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {loadState} from "./storage"
import axios, {AxiosError} from "axios"
import {LoginDTO} from "../helpers/auth.dto"
import {PREFIX} from "../helpers/API"
import {Profile} from "../helpers/user.dto"
import {RootStore} from "./store"

export const JWT_PERSISTENT_STATE = "userData"

type UserPersistentState = {
  jwt: string | null
}

type UserState = {
  jwt: string | null
  loginErrorMessage?: string
  registerErrorMessage?: string
  profile?: Profile
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

export const login = createAsyncThunk("user/login",
  async (arg: { email: string, password: string }) => {
    try {
      const {data} = await axios.post<LoginDTO>(`${PREFIX}/auth/login`, {
        email: arg.email,
        password: arg.password
      })

      return data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message)
      }
    }
  }
)

export const register = createAsyncThunk("user/register",
  async (arg: { email: string, password: string, name: string }) => {
    try {
      const {data} = await axios.post<LoginDTO>(`${PREFIX}/auth/register`, {
        email: arg.email,
        password: arg.password,
        name: arg.name
      })

      return data
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message)
      }
    }
  }
)

export const getProfile = createAsyncThunk<Profile, void, { state: RootStore }>("user/getProfile",
  async (_, thunkAPI) => {
    const jwt = thunkAPI.getState().user.jwt

    const {data} = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    return data
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  selectors: {
    userGetJwt: (state: UserState) => state.jwt,
    loginGetErrorMessage: (state: UserState) => state.loginErrorMessage,
    userProfile: (state: UserState) => state.profile,
    registerGetErrorMessage: (state: UserState) => state.registerErrorMessage
  },
  reducers: {
    logout: (state) => {
      state.jwt = null
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return
      state.jwt = action.payload.access_token
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (!action.payload) return
      state.profile = action.payload
    })
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) return
      state.jwt = action.payload.access_token
    })
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message
    })
  }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
export const userName = userSlice.name
export const {
  userGetJwt,
  loginGetErrorMessage,
  userProfile,
  registerGetErrorMessage
} = userSlice.selectors
export const userAsyncThunk = {login, register}