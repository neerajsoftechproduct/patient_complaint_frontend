import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Refresh } from '@mui/icons-material';

const DoctorHelp = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} >
        <Grid size={12}>
          <Box sx={{
            backgroundColor: "#ddd",
            height: 50,
            paddingLeft: 2,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            alignItems: "center",
            display: "flex"
          }}>
            <Typography sx={{

              fontSize: 20,
              fontWeight: 600,
              color: "#5f7a65",

            }} >Total : 0</Typography>
            <Button title='Refresh' startIcon={<Refresh />} />
          </Box>

          <AnnouncementBlock />
        </Grid>
        <Grid size={12} >
          <Typography sx={{ paddingLeft: 2, paddingBottom: 2 }}>No Verification Consultations Available For You.......!!!</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DoctorHelp