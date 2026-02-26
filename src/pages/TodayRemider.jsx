import { Box, Button, Container, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Refresh, Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGettodayremiderQuery, useLazyGettodayremiderQuery } from '../stores/services/appointmentApi';
import { skipToken } from '@reduxjs/toolkit/query';
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
const TodayRemider = () => {
  const user = useSelector(state => state.user.agent)
  const [toDisPlayData, setToDisPlayData] = useState([])
  const [page, setPage] = useState(0);
  const [requestId, setrequestId] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: defaultData, error, refetch, isLoading } = useGettodayremiderQuery(
    user?.uname ?
      {
        AgentId: user?.uname
      }
      :
      skipToken
  )
  const [triggeredFilterData,
    {
      data: filteredData,
      isFetching: isFiltering
    }
  ] = useLazyGettodayremiderQuery()
  useEffect(() => {
    if (defaultData?.data) {
      setToDisPlayData(defaultData?.data)
    }
  }, [defaultData])
  useEffect(() => {
    if (filteredData?.data) {
      setToDisPlayData(filteredData?.data)
    }
  }, [filteredData])

  const handleSearch = async () => {
    try {
      if (!requestId) {
        alert('Appointment or Patient Id is required')
        return;
      }
      let payload = {
        AgentId: user?.uname
      }
      if (requestId) {
        payload.requestId = requestId
      }
      const res = await triggeredFilterData(payload)
    } catch (error) {
      console.log(error?.message);

    }
  }

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
            value={requestId}
            onChange={(e) => setrequestId(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={handleSearch}>
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

export default TodayRemider