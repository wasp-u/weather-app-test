import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
})

type RootReducerType = typeof store.getState
export type RootStateType = ReturnType<RootReducerType>
