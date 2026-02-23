// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['Patient'],
    endpoints: (builder) => ({
        getPatient: builder.query({
            query: (params) => ({
                url: "/patient/get-patient-details",
                method: "GET",
                params
            })
        }),
        getInboundLeadsForAgent: builder.query({
            query: (params) => ({
                url: "/patient/get-inbound-leads-by-agentId",
                method: "GET",
                params
            })
        })
    }),
})


export const {
    useLazyGetPatientQuery,
    useGetInboundLeadsForAgentQuery
} = patientApi