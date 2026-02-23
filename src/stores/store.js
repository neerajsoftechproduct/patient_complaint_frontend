import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './features/commonSlices'
import userReducer from './features/userSlice'
import { patientApi } from './services/patientApi'
import { userApi } from './services/userApi'
import { mynotesApi } from './services/mynotesApi'
export const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [mynotesApi.reducerPath]:mynotesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            [
                patientApi.middleware,
                userApi.middleware,
                mynotesApi.middleware
            ]
        ),
})