import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
    sessionId: null,
    campaignId: null,
    agent: null,
    patientId: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload
        },
        setCampaignId: (state, action) => {
            state.campaignId = action.payload
        },
        setAgent: (state, action) => {
            state.agent = action.payload
        },
        setPatientId: (state, action) => {
            state.patientId = action.payload
        }
    }
})

export const { setUserId, setSessionId, setCampaignId, setAgent, setPatientId } = userSlice.actions;

export default userSlice.reducer;