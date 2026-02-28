// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['Ticket'],
    endpoints: (builder) => ({
        searchTicketByTicketId:builder.query({
            query:(params)=>({
                url:"/ticket/search-by-tickets",
                method:"GET",
                params
            })
        }),
        getTicketsCount:builder.query({
            query:(params)=>({
                url:"/ticket/get-tickets-count",
                method:"GET",
                params
            })
        }),
        getFilteredTickets:builder.query({
            query:(params)=>({
                url:"/ticket/get-tickets-by-agent",
                method:"GET",
                params
            })
        }),
    }),
})


export const {
    useGetFilteredTicketsQuery,
    useGetTicketsCountQuery,
    useSearchTicketByTicketIdQuery,
    useLazyGetFilteredTicketsQuery,
    useLazyGetTicketsCountQuery,
    useLazySearchTicketByTicketIdQuery
} = ticketApi