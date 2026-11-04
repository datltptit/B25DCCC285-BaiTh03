import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { LoadingStatus, Product } from '../../types'

const API_URL = 'https://fakestoreapi.com/products'

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) {
        return rejectWithValue(`Lỗi tải dữ liệu (${res.status})`)
      }
      const data = (await res.json()) as Product[]
      return data
    } catch {
      return rejectWithValue('Không thể kết nối tới máy chủ')
    }
  },
)

interface ProductsState {
  items: Product[]
  status: LoadingStatus
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Đã có lỗi xảy ra'
      })
  },
})

export default productsSlice.reducer
