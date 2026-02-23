import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
const ComplienceAudit = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <FormControl fullWidth>
            <InputLabel id="Select Accepted Status">Select Accepted Status</InputLabel>
            <Select
              labelId="Select Accepted Status"


              label="Select Accepted Status"

            >
              <MenuItem value="No" >No</MenuItem>
              <MenuItem value="Yes" >Yes</MenuItem>

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

export default ComplienceAudit