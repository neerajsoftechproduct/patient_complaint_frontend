import { Box, Button, Container, Grid, IconButton, Typography, TextField, InputAdornment, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Call, Refresh } from '@mui/icons-material';
import SearchIcon from "@mui/icons-material/Search";
import { useLazyGetPatientQuery } from '../stores/services/patientApi';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
const head = ['Sl.No', 'PatientID', 'Name', 'Disposition Code', 'Comments', 'Date', 'Time', 'Action']
const tc = {
  border: "1px solid #ccc"
}
const SearchPatients = () => {
  const user = useSelector(state => state.user)
  console.log({ user });

  const [search, setSearch] = useState("");
  const [displaytext, setDisplayText] = useState([])
  const [triggeredPatient,
    {
      data: filterPatient,
      isLoading,
      error
    }
  ] = useLazyGetPatientQuery()

  const handleSearch = () => {
    triggeredPatient({
      patientId: search
    })
    // call API or filter table here
  };


  useEffect(() => {
    if (filterPatient?.data) {
      setDisplayText(filterPatient?.data)
    }
  }, [filterPatient])

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Skeleton variant="text" width={500} height={300} />
      </Box>
    )
  }
  console.log({ displaytext });


  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} >
        <Grid size={12}>
          <AnnouncementBlock />
        </Grid>
        <Grid size={12} >
          <Box sx={{ display: "flex", gap: 2, width: '96%', marginX: "auto", paddingBottom: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

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
                    displaytext?.length > 0 ?
                      (
                        displaytext?.map((item, index) => {
                          return (
                            <TableRow key={index} >
                              <TableCell sx={tc} >{index + 1}</TableCell>
                              <TableCell sx={tc}>{item?.PatientId}</TableCell>
                              <TableCell sx={tc}>{item?.PatientName}</TableCell>
                              <TableCell sx={tc}>{item?.dispositionCode}</TableCell>

                              <TableCell sx={tc}>{item?.comments || 'N/A'}</TableCell>
                              <TableCell sx={tc}>{dayjs(item?.followUpDate).format('YYYY-MM-DD')}</TableCell>
                              <TableCell sx={tc}>{dayjs(item?.followUpTime).format('hh:mm A')}</TableCell>
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

export default SearchPatients