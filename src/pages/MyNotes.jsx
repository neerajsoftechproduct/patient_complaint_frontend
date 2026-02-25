import { Refresh } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, TextField, Typography, Stack, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useCreateMyNoteMutation, useGetMyNotesQuery } from '../stores/services/mynotesApi';
import { toast } from 'react-toastify';
import { skipToken } from '@reduxjs/toolkit/query';
import dayjs from 'dayjs';
const head = [
  "Sl.No",
  "Notes",
  "Agent Name",
  "Created Date",
  "Created Time"
]
const tc = {
  border: "1px solid #ccc"
}
const MyNotes = () => {
  const user = useSelector(state => state.user.agent)
  const [text, setText] = useState("");
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
  const [createMyNote] = useCreateMyNoteMutation()
  const { data: defaultData, refetch } = useGetMyNotesQuery(
    user?.uID ? {
      AgentID: user?.uID
    } :
      skipToken
  )
  const maxLength = 1000;

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const handleClear = () => {
    setText("");
  };

  const handleSave = async () => {
    try {
      const payload = {
        Notes: text,
        AgentID: user.uID,
        AgentName: user.uname
      }
      const res = await createMyNote(payload)
      if (res?.data?.success) {
        toast.success('Note created successfully')
        setText("")
        refetch()
      } else {
        toast.warning('Failed to create try again')
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

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
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <Button variant='contained' endIcon={<Refresh />} onClick={() => refetch()} >Refresh</Button>
        </Grid>
        <Grid size={12} >
          <Box sx={{ width: "100%" }}>

            {/* Text Area */}
            <TextField
              multiline
              rows={8}
              fullWidth
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setText(e.target.value);
                }
              }}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#115293",
                  },
                },
              }}
            />

            {/* Counter */}
            <Typography
              variant="body2"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              {text.length}/{maxLength} | {wordCount} words
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                variant="outlined"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Stack>
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
                            <TableRow key={index} >
                              <TableCell>{index+1}</TableCell>
                              <TableCell>{item?.Notes}</TableCell>
                              <TableCell>{item?.AgentName}</TableCell>
                              <TableCell>{dayjs(item?.createdDate).format('YYYY-MM-DD')}</TableCell>
                              <TableCell>{dayjs(item?.createdTime).format('HH:MM A')}</TableCell>
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

export default MyNotes