import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCreateITIssueMutation, useGetITIssuesQuery } from '../stores/services/itissuesApi'
import { toast } from 'react-toastify'
import { skipToken } from '@reduxjs/toolkit/query'
import dayjs from 'dayjs'
const head = [
  "Sl.No",
  "IT Issues",
  'IT Issues Status',
  "Agent Name",
  "Created Date & Time",
  "Updated Date & Time"
]
const tc = {
  border: "1px solid #ccc"
}
const SubmitIssues = () => {
  const user = useSelector(state => state.user)
  const [comments, setComments] = useState("")
  const [createItIsue] = useCreateITIssueMutation()
  const { data: defaultData, refetch } = useGetITIssuesQuery(
    user?.agent?.uID ? {
      AgentID: user?.agent?.uID
    } :
      skipToken
  )


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
  const handleSave = async () => {
    try {
      const payload = {
        AgentID: user.agent.uID,
        AgentName: user.agent.uname,
        IssueStatus: "Open",
        Comments: comments,
        CampaignID: user.campaignId
      }
      const res = await createItIsue(payload)
      console.log({res});
      
      if (res?.data?.success) {
        refetch()
        toast.success('IT Issue submited successfully')
        setComments("")
      } else {
        toast.warning('Failed to submit IT Issue')
      }
    } catch (error) {
      console.log({error});
      
      // toast.error(error.message)
    }
  }

  useEffect(() => {
    if (defaultData?.data) {
      setToDisPlayData(defaultData?.data)
    }
  }, [defaultData])

  const paginatedData = toDisPlayData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} >
        <Grid size={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: 2, paddingBottom: 2, mt: 2 }}>
            <TextField label='Enter IT issues' size='small'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <Button variant='contained' onClick={() => handleSave()} >Submit</Button>
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
                            <TableRow index >
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item?.Comments}</TableCell>
                              <TableCell>{item?.IssueStatus}</TableCell>
                              <TableCell>{item?.AgentName}</TableCell>
                              <TableCell>{`${dayjs(item?.CreatedDate).format('YYYY-MM-DD')} / ${dayjs(item?.CreatedTime).format('HH:MM A')}`}</TableCell>
                              <TableCell>{`${dayjs(item?.UpdatedDate).format('YYYY-MM-DD')} / ${dayjs(item?.UpdatedTime).format('HH:MM A')}`}</TableCell>
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
      </Grid >
    </Container >
  )
}

export default SubmitIssues