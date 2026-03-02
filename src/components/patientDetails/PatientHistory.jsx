import React from 'react'
import { useSelector } from 'react-redux'
const head=[]

const PatientHistory = () => {
    const user = useSelector(state => state.user)
  return (
    <div>PatientHistory</div>
  )
}

export default PatientHistory