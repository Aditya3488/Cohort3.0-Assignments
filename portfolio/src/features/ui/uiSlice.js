import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  activeSection: 'home',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload
    },
  },
})

export const { setLoading, setActiveSection } = uiSlice.actions

export const selectIsLoading = (state) => state.ui.isLoading
export const selectActiveSection = (state) => state.ui.activeSection

export default uiSlice.reducer