import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const TodayCallReport = () => {
  const [fromDate, setFromDate] = React.useState(dayjs());
  const [toDate, setToDate] = React.useState(dayjs());

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={3} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%' }}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",   // 👈 control size here
                    fullWidth: true
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid size={3} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%' }}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",   // 👈 control size here
                    fullWidth: true
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid size={6} >
          <Box sx={{ display: "flex", gap: 2 }} >
            <Button variant='contained' color='success'>Search Report</Button>
            <Button variant='contained'>Today</Button>
            <Button variant='contained' color='error'>Reset</Button>

          </Box>
        </Grid>

        <Grid size={12} >
          <Typography sx={{ paddingLeft: 2, paddingBottom: 2, mt: 2 }}>No today call report For You.......!!!</Typography>
        </Grid>

      </Grid>
    </Container>
  )
}

export default TodayCallReport