import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
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
const FeedbackCalling = () => {
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
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
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

export default FeedbackCalling