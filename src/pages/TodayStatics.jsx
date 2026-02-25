import {
  Box, Button, Container, Grid, IconButton, Typography, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AnnouncementBlock from "../components/AnnouncementBlock";
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useGetTodayStaticsQuery } from '../stores/services/userApi';
import { skipToken } from '@reduxjs/toolkit/query';
const data = [
  {
    agent: "Test4",
    totalAssign: 0,
    unusedLeads: 0,
    orders: 0,
    verifiedOrder: 0,
    hold: 0,
    pending: 0,
    denied: 0,
    nonContact: 0
  }
];

const TodayStatics = () => {
  const user = useSelector(state => state.user.agent)
  const [toDisplayData, setToDisplayData] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const { data: defaultData } = useGetTodayStaticsQuery(
    user?.uname ?
      {
        AgentID: user?.uname
      } :
      skipToken
  )
  console.log({ defaultData });

  useEffect(() => {
    if (defaultData?.success) {
      setToDisplayData(defaultData?.dispositionStats)
      setTotalOrder(defaultData?.totalOrder)
    }
  }, [defaultData])
  console.log({ toDisplayData });


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
        <Grid size={12} sx={{ paddingX: 2 }} >
          <TableContainer component={Paper} >
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#6f7f6e" }}>
                  {[
                    "Docor/Agent",
                    "TotalAssign",
                    "Unused Leads",
                    "Orders",
                    "Verified Order",
                    "Hold",
                    "Pending",
                    "Denied",
                    "NonContact"
                  ].map((header, index) => (
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
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell

                    sx={{
                      border: "1px solid #ccc"
                    }}
                  >
                    {user?.uname}
                  </TableCell>
                  <TableCell

                    sx={{
                      border: "1px solid #ccc"
                    }}
                  >0</TableCell>
                  <TableCell

                    sx={{
                      border: "1px solid #ccc"
                    }}
                  >0</TableCell>
                  <TableCell

                    sx={{
                      border: "1px solid #ccc"
                    }}
                  >{totalOrder}</TableCell>
                  {
                    toDisplayData?.map((item, index) => {
                      return (
                        <TableCell

                          sx={{
                            border: "1px solid #ccc"
                          }}
                        >{item?.TotalCount || 0}</TableCell>
                      )
                    })

                  }


                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TodayStatics