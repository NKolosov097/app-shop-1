import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SERVER_API } from "../../consts"
import { ICardItem, ICardsSlicer, IDataError, Status } from "../../types"

export const fetchGetCards = createAsyncThunk(
  "cards/fetchGetCards",
  async () => {
    try {
      const data = await fetch(`${SERVER_API}/cards`)
        .then((res) => res.json())
        .catch((err) => console.log(err))

      return data.map((item: ICardItem) => {
        item.count = 0

        return item
      }) as Array<ICardItem> | IDataError
    } catch (error) {
      return new Error(error as unknown as string)
    }
  }
)

export const fetchUpdateCard = createAsyncThunk(
  "cards/fetchUpdateCard",
  async (params: string) => {
    try {
      const data = await fetch(`${SERVER_API}/cards/${params}`, {
        mode: "no-cors",
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))

      return data as ICardItem | IDataError
    } catch (error) {
      return new Error(error as unknown as string)
    }
  }
)

const initialState: ICardsSlicer = {
  data: null,
  item: null,
  cart: [],
  status: Status.loading,
}

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    incCardInCart: (state: ICardsSlicer, action) => {
      if (!state.cart.find((i) => i._id === action.payload)) {
        const card = (state.data as Array<ICardItem>).find(
          (c) => c._id === action.payload
        )
        card
          ? (state.cart = [...state.cart, { ...card, count: 0 }])
          : (state.cart = [...state.cart])
      }

      state.cart.map((card) => {
        if (card._id === action.payload) {
          card = { ...card, count: card.count++ }
        }

        return card
      })

      return state
    },
    decCardInCart: (state: ICardsSlicer, action) => {
      let isLast = false

      state.cart.map((card) => {
        if (card._id === action.payload) {
          if (card.count === 1) {
            isLast = true
          }
          card = { ...card, count: card.count-- }
        }

        return card
      })

      if (isLast) {
        state.cart = [
          ...state.cart.filter((card) => card._id !== action.payload),
        ]
      }

      return state
    },
    removeCardFromCart: (state: ICardsSlicer, action) => {
      state.cart = [
        ...state.cart.filter((card) => {
          if (card._id === action.payload) {
            card = { ...card, count: 0 }
          }

          return card._id !== action.payload
        }),
      ]

      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCards.pending, (state: ICardsSlicer) => {
        state.data = null
        state.status = Status.loading
      })
      .addCase(fetchGetCards.fulfilled, (state: ICardsSlicer, action) => {
        state.data = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchGetCards.rejected, (state: ICardsSlicer) => {
        state.data = null
        state.status = Status.error
      })
      .addCase(fetchUpdateCard.pending, (state: ICardsSlicer) => {
        state.item = null
        state.status = Status.loading
      })
      .addCase(fetchUpdateCard.fulfilled, (state: ICardsSlicer, action) => {
        state.item = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchUpdateCard.rejected, (state: ICardsSlicer) => {
        state.item = null
        state.status = Status.error
      })
  },
})

export const cardsReducer = cardsSlice.reducer
export const { incCardInCart, decCardInCart, removeCardFromCart } =
  cardsSlice.actions
