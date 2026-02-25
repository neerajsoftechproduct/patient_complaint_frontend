// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const itissuesApi = createApi({
    reducerPath: 'itissuesApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['ITIssues'],
    endpoints: (builder) => ({
        createITIssue: builder.mutation({
            query: (data) => ({
                url: "/itissues/create-it-issue",
                method: "POST",
                body: data
            })
        }),
        getITIssues: builder.query({
            query: (params) => ({
                url: "/itissues/get-it-issues",
                method: "GET",
                params
            })
        })

    }),
})


export const {
    useCreateITIssueMutation,
    useGetITIssuesQuery
} = itissuesApi