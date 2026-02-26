import { Refresh } from '@mui/icons-material'
import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
const head = [
  "Sl.No",
  "Problem",
  "AppointId",
  'PatientID',
  "Patient Name",
  "Clinic Name",
  "Comments",
  "Appointment Status",
  "Disposition Code",
  "Created Date & Time",
]
const tc = {
  border: "1px solid #ccc"
}
const Tickets = () => {
  const [toDisPlayData, setToDisPlayData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const paginatedData = toDisPlayData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <TextField label='Search with Ticket Id' size='small' />
            <Button variant='contained' color='success' >Search Ticket Id</Button>
          </Box>
        </Grid>
        <Grid size={12} >
          <Button endIcon={<Refresh />} variant='contained' >Refresh Here For All Tickets</Button>
        </Grid>
        <Grid size={3} >
          <Stack
            spacing={1}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              All Tickets
            </Typography>
            <Typography variant="h4" color="primary">
              0
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3} >
          <Stack
            spacing={1}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Open
            </Typography>
            <Typography variant="h4" color="primary">
              0
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3} >
          <Stack
            spacing={1}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Overdue Tickets
            </Typography>
            <Typography variant="h4" color="primary">
              0
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3} >
          <Stack
            spacing={1}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Solved
            </Typography>
            <Typography variant="h4" color="primary">
              0
            </Typography>
          </Stack>
        </Grid>
        <Grid size={4} ></Grid>
        <Grid size={8} >
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }} >
            <FormControl fullWidth>
              <InputLabel id="Created On:">Created On:</InputLabel>
              <Select
                labelId="Created On:"


                label="Created On:"

              >
                <MenuItem value="Last Two Months" >Last Two Months</MenuItem>
                <MenuItem value="Last Three Months" >Last Three Months</MenuItem>
                <MenuItem value="Last Six Months" >Last Six Months</MenuItem>
                <MenuItem value="Last One Year" >Last One Year</MenuItem>

              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="Priority:">Priority:</InputLabel>
              <Select
                labelId="Priority:"


                label="Priority:"

              >
                <MenuItem value="All" >All</MenuItem>
                <MenuItem value="Normal" >Normal</MenuItem>
                <MenuItem value="Urgent" >Urgent</MenuItem>
                <MenuItem value="Critical" >Critical</MenuItem>

              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="Sort By:">Sort By:</InputLabel>
              <Select
                labelId="Sort By:"


                label="Sort By:"

              >
                <MenuItem value="High to Low Follow-Up" >High to Low Follow-Up</MenuItem>
                <MenuItem value="Low to High Follow-Up" >Low to High Follow-Up</MenuItem>
                <MenuItem value="New to Old" >New to Old</MenuItem>
                <MenuItem value="Old to New" >Old to New</MenuItem>

              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={12} >

          <Paper>
            <TableContainer>
              <Table sx={{ borderCollapse: "collapse" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#6f7f6e" }}>
                    {
                      head.map((header, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            border: "1px solid #ccc"
                          }}
                        >
                          {header}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    paginatedData?.length > 0 ?
                      (
                        paginatedData?.map((item, index) => {
                          return (
                            <TableRow index={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item?.Problem}</TableCell>
                              <TableCell>{item?.AppointmentID}</TableCell>
                              <TableCell>{item?.PatientID}</TableCell>
                              <TableCell>{item?.PatientName}</TableCell>
                              <TableCell>{item?.ClinicName}</TableCell>

                              <TableCell>{item?.Comments}</TableCell>
                              <TableCell>{item?.AppointmentStatus}</TableCell>
                              <TableCell>{item?.DispositionCode}</TableCell>
                              <TableCell>{`${dayjs(item?.CreatedDate).format('YYYY-MM-DD')}:${dayjs(item?.CreatedTime).format('HH-MM A')}`}</TableCell>

                            </TableRow>
                          )
                        })
                      )
                      :
                      (
                        <TableRow>
                          <TableCell colSpan={head.length} align="center">
                            No data available
                          </TableCell>
                        </TableRow>
                      )
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={toDisPlayData?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>

        </Grid>
      </Grid>
    </Container>
  )
}

export default Tickets