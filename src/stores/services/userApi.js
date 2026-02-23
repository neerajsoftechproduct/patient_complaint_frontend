import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        checkUser: builder.query({
            query: (params) => ({
                url: "/user/check-user",
                method: "GET",
                params
            }),
            invalidatesTags: ['User']
        }),
        getAgentId: builder.query({
            query: (params) => ({
                url: "/user/get-agent-id",
                method: "GET",
                params
            })
        }),
        getAgentDirectConsulation: builder.query({
            query: (params) => ({
                url: "/user/get-agent-direct-consultation",
                method: "GET",
                params
            })
        }),

    })
})

export const {
    useCheckUserQuery,
    useGetAgentIdQuery,
    useGetAgentDirectConsulationQuery
} = userApi