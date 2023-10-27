import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  IAuthSlicer,
  IDataLogin,
  IDataRegister,
  IUser,
  IDataError,
  Status,
} from "../../types"
import { SERVER_API } from "../../consts"

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: IDataRegister) => {
    try {
      const data = await fetch(`${SERVER_API}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))

      localStorage.setItem("token", data.token)

      return data as IUser | IDataError
    } catch (error) {
      return new Error(error as unknown as string)
    }
  }
)

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: IDataLogin) => {
    try {
      const data = await fetch(`${SERVER_API}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))

      localStorage.setItem("token", data.token)

      return data as IUser | IDataError
    } catch (error) {
      return new Error(error as unknown as string)
    }
  }
)

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  try {
    const data = await fetch(`${SERVER_API}/auth/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))

    return data as IUser | IDataError
  } catch (error) {
    return new Error(error as unknown as string)
  }
})

const initialState: IAuthSlicer = {
  data: null,
  status: Status.loading,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: IAuthSlicer) => {
      state.data = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.loading
      })
      .addCase(fetchLogin.fulfilled, (state: IAuthSlicer, action) => {
        state.data = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchLogin.rejected, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.error
      })
      .addCase(fetchAuthMe.pending, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.loading
      })
      .addCase(fetchAuthMe.fulfilled, (state: IAuthSlicer, action) => {
        state.data = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchAuthMe.rejected, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.error
      })
      .addCase(fetchRegister.pending, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.loading
      })
      .addCase(fetchRegister.fulfilled, (state: IAuthSlicer, action) => {
        state.data = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchRegister.rejected, (state: IAuthSlicer) => {
        state.data = null
        state.status = Status.error
      })
  },
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions
