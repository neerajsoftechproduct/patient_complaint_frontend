import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './features/commonSlices'
import userReducer from './features/userSlice'
import { patientApi } from './services/patientApi'
import { userApi } from './services/userApi'
import { mynotesApi } from './services/mynotesApi'
import { itissuesApi } from './services/itissuesApi'
import { appointmentApi } from './services/appointmentApi'
import { ticketApi } from './services/ticketApi'
export const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [mynotesApi.reducerPath]: mynotesApi.reducer,
        [itissuesApi.reducerPath]: itissuesApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [ticketApi.reducerPath]:ticketApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            [
                patientApi.middleware,
                userApi.middleware,
                mynotesApi.middleware,
                itissuesApi.middleware,
                appointmentApi.middleware,
                ticketApi.middleware
            ]
        ),
})