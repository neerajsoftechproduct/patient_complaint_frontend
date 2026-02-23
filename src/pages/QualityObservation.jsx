import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

const QualityObservation = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <FormControl fullWidth>
            <InputLabel id="Select Quality Observation Status">Select Quality Observation Status</InputLabel>
            <Select
              labelId="Select Quality Observation Status"


              label="Select Quality Observation Status"

            >
              <MenuItem value="Pending" >Pending</MenuItem>
              <MenuItem value="Closed" >Closed</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid size={12} >
          <Typography>No Data available</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default QualityObservation