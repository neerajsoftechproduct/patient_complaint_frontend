// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['Appointment'],
    endpoints: (builder) => ({
        gettodayremider: builder.query({
            query: (params) => ({
                url: "/appointment/get-today-reminder",
                method: "GET",
                params
            })
        }),
        getNonContactAppointment: builder.query({
            query: (params) => ({
                url: "/appointment/get-non-contract-appointment",
                method: "GET",
                params
            })
        }),
        getholdAppointment: builder.query({
            query: (params) => ({
                url: "/appointment/get-hold-appointment",
                method: "GET",
                params
            })
        }),
        getfollowUpAppointment: builder.query({
            query: (params) => ({
                url: "/appointment/get-followup-appointment",
                method: "GET",
                params
            })
        }),
        getConfirmDateAppointment: builder.query({
            query: (params) => ({
                url: "/appointment/get-confirm-date-later-appointment",
                method: "GET",
                params
            })
        }),
        getCallBackAppointment: builder.query({
            query: (params) => ({
                url: "/appointment/get-call-back-appointment",
                method: "GET",
                params
            })
        }),

    }),
})


export const {
    useGettodayremiderQuery,
    useLazyGettodayremiderQuery,
    useGetNonContactAppointmentQuery,
    useLazyGetNonContactAppointmentQuery,
    useGetfollowUpAppointmentQuery,
    useLazyGetfollowUpAppointmentQuery,
    useGetholdAppointmentQuery,
    useLazyGetholdAppointmentQuery,
    useGetConfirmDateAppointmentQuery,
    useLazyGetConfirmDateAppointmentQuery,
    useGetCallBackAppointmentQuery,
    useLazyGetCallBackAppointmentQuery
} = appointmentApi