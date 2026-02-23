import {
  Box,
  Button,
  Container, Grid,
  IconButton, Paper, Skeleton, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Call, Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGetAgentDirectConsulationQuery } from '../stores/services/userApi';
import { skipToken } from '@reduxjs/toolkit/query';
import dayjs from 'dayjs';
const head = ['Sl.No', 'PatientID', 'Name', 'Disposition Code', 'Comments', 'Date', 'Time', 'Action']
const tc = {
  border: "1px solid #ccc"
}
const DirectConsulation = () => {
  const user = useSelector(state => state.user.agent)
  const [toDisplayData, setToDisplayData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { data: getAgentDirectConsultaion, isLoading, isFetching, refetch } = useGetAgentDirectConsulationQuery(
    user?.uname ?
      {
        uname: user.uname
      }
      : skipToken
  )

  useEffect(() => {
    if (getAgentDirectConsultaion?.data) {
      setToDisplayData(getAgentDirectConsultaion?.data)
    }
  }, [getAgentDirectConsultaion])
  const paginatedData = toDisplayData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isFetching || isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Skeleton variant="text" width={500} height={300} />
      </Box>
    )
  }

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

            }} >Total : {toDisplayData?.length || 0}</Typography>
            <Button title='Refresh' startIcon={<Refresh />} onClick={() => refetch()} />
          </Box>

          <AnnouncementBlock />
        </Grid>
        <Grid size={12} sx={{ paddingX: 4 }} >
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
                            <TableRow key={index} >
                              <TableCell sx={tc}>{index + 1}</TableCell>
                              <TableCell sx={tc}>{item?.patientId}</TableCell>
                              <TableCell sx={tc}>{item?.name}</TableCell>
                              <TableCell sx={tc}>{item?.disposition_code}</TableCell>

                              <TableCell sx={tc}>{item?.comments || 'N/A'}</TableCell>
                              <TableCell sx={tc}>{dayjs(item?.CreatedDate).format('YYYY-MM-DD')}</TableCell>
                              <TableCell sx={tc}>{dayjs(item?.CreatedTime).format('hh:mm A')}</TableCell>
                              <TableCell sx={tc}>
                                <IconButton color='success'>
                                  <Call />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )
                      :
                      (
                        <TableRow>
                          <TableCell colSpan={head.length} align="center" sx={tc}>
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
              count={toDisplayData?.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        </Grid>
      </Grid >
    </Container >
  )
}

export default DirectConsulation