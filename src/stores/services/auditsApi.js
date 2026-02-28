// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../config/api'

// Define a service using a base URL and expected endpoints
export const auditsApi = createApi({
    reducerPath: 'auditsApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    tagTypes: ['Audit'],
    endpoints: (builder) => ({
        getCallListenAudio: builder.query({
            query: (params) => ({
                url: "/audit/get-call-listen-audio",
                method: "GET",
                params
            })
        }),
        getQaulityObservation: builder.query({
            query: (params) => ({
                url: "/audit/get-quality-observation",
                method: "GET",
                params
            })
        }),
        getQaulityObservationStatus: builder.query({
            query: (params) => ({
                url: "/audit/get-quality-observation-status",
                method: "GET",
                params
            })
        }),
        getComplienceAuditStatus: builder.query({
            query: (params) => ({
                url: "get-complience-audit-status",
                method: "GET",
                params
            })
        }),
        getComplienceAudit: builder.query({
            query: (params) => ({
                url: "/audit/get-complience-audit",
                method: "GET",
                params
            })
        }),
    }),
})


export const {
  useGetCallListenAudioQuery,
  useGetComplienceAuditQuery,
  useGetComplienceAuditStatusQuery,
  useGetQaulityObservationQuery,
  useGetQaulityObservationStatusQuery
} = auditsApi