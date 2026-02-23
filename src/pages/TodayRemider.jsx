import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Refresh } from '@mui/icons-material';

const TodayRemider = () => {
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
        </Grid>
        <Grid size={12} sx={{ paddingLeft: 2, paddingBottom: 2 }}>
          <TextField sx={{mb:2}} label='Appointment Id, Custome' placeholder='Appointment Id, Custome' />
          <Typography >No Reminders Available For You.......!!!</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TodayRemider