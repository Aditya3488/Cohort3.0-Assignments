import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../../features/auth/state/auth/authSlice.jsx'
import { themeSlice } from '../../shared/state/themeSlice.jsx'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice.reducer,
    }
})