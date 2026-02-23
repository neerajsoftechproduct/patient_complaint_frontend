import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'

const CallListenAudio = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <Typography>No Data available</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CallListenAudio