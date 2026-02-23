import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'

const SubmitIssues = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} >
        <Grid size={12}>
           <Box sx={{display:"flex",alignItems:"center",gap:2,paddingLeft: 2, paddingBottom: 2,mt:2}}>
             <TextField label='Enter IT issues' size='small' />
             <Button variant='contained' >Submit</Button>
           </Box>
        </Grid>
        <Grid size={12} >
          <Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>No IT issues For You.......!!!</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SubmitIssues