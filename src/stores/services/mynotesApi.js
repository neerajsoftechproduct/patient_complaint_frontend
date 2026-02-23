// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const mynotesApi = createApi({
    reducerPath: 'mynotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        createMyNote: builder.mutation({
            query: (data) => ({
                url: "/note/create-my-notes",
                method: "POST",
                body: data
            })
        }),
        getMyNotes: builder.query({
            query: (params) => ({
                url: "/note/get-my-notes",
                method: "GET",
                params
            })
        })

    }),
})


export const {
    useCreateMyNoteMutation,
    useGetMyNotesQuery,
    useLazyGetMyNotesQuery
} = mynotesApi