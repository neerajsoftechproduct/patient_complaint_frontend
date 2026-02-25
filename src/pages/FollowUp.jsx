import { Box, Button, Container, Grid, IconButton, TextField, Typography,InputAdornment ,Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import React, { useState } from 'react'
import { Refresh, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
const head = [
  "Sl.No",
  "Problem",
  "AppointId",
  'PatientID',
  "Patient Name",
  "Clinic Name",
  "Appointment Date & Time",
  "Reminder Date",
  "Comments",
  "Appointment Status",
  "Disposition Code",
  "Created Date & Time",
  "Updated Date & Time"
]
const tc = {
  border: "1px solid #ccc"
}
const FollowUp = () => {
  const user = useSelector(state => state.user)
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

            }} >Total : {toDisPlayData?.length || 0}</Typography>
            <Button title='Refresh' startIcon={<Refresh />} />
          </Box>
        </Grid>
        <Grid size={6} sx={{ paddingLeft: 2, paddingBottom: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Appointment Id / Customer"
            placeholder="Enter Appointment Id or Customer name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FollowUp