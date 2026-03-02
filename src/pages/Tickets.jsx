import { Refresh } from '@mui/icons-material'
import { Box, Button, Container, Divider, FormControl, Grid, Chip, InputLabel, Menu, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useGetFilteredTicketsQuery, useGetTicketsCountQuery, useLazyGetFilteredTicketsQuery, useLazySearchTicketByTicketIdQuery } from '../stores/services/ticketApi'
import { toast } from 'react-toastify'
import CommonModal from '../components/CommonModal'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import { setIcon, setPageName, setRoute } from '../stores/features/commonSlices'
import {setPatientId} from '../stores/features/userSlice'

dayjs.extend(relativeTime);

const head = [
  "Sl.No",
  "Ticket ID",
  "Ticket Status",
  'Patient ID',
  "Created By",
  "Created Date",
  "Ticket History",
]
const head1 = ['Issue Type', 'Other Tag, If Any', 'Remarks', 'TAT', 'Ticket Status', 'Ticket Priority', 'Created By']
const tc = {
  border: "1px solid #ccc"
}
const Tickets = () => {
  const user = useSelector(state => state.user.agent)
  const dispatch = useDispatch()
  const [toDisPlayData, setToDisPlayData] = useState([])
  const [ticketData, setTicketData] = useState(null)
  const [ticketIssue, setTicketIssue] = useState([])
  const [searchKey, setSearchKey] = useState(0);
  const [ticketModal, setTicketModal] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ticket, setTicket] = useState(null)
  const [allTickets, setAllTickets] = useState(0)
  const [openTicket, setOpenTicket] = useState(0)
  const [pendingTicket, setPendingTickets] = useState(0)
  const [progressTicket, setProgressTicket] = useState(0)
  const [overdueTicket, setOverdueTicket] = useState(0)
  const [solvedTicket, setSolvedTicket] = useState(0)
  const [createdOn, setCreatedOn] = useState(null)
  const [priority, setPriority] = useState(null)
  const [sortBy, setSortBy] = useState(null)
  const [ticketStatus, setTicketStatus] = useState(null)
  const { data: ticketsCount, refetch: refetchCount, isFetching } = useGetTicketsCountQuery(
    user?.uname ?
      {
        uname: user?.uname
      }
      : skipToken
  )
  const { data: getDefaultTickets, refetch: refetchTickets } = useGetFilteredTicketsQuery(
    user?.uname ?
      {
        uname: user?.uname,
        status: 'Open,Progress,Pending'
      }
      : skipToken
  )
  const [
    GetFilteredTickets,
    {
      data: filteredTicketsData,
      isLoading
    }
  ] = useLazyGetFilteredTicketsQuery()

  const handleSearchTicketsData = () => {
    const payload = {
      uname: user?.uname
    }
    if (ticketStatus) {
      payload.status = ticketStatus
    }
    if (createdOn) {
      payload.CreatedDate = createdOn
    }
    if (priority) {
      payload.PriorityBy = priority
    }
    if (sortBy) {
      payload.SortBy = sortBy
    }
    console.log({ payload });

    GetFilteredTickets(payload)
  }
  const handleClearFilter = () => {
    setCreatedOn(null)
    setPriority(null)
    setSortBy(null)
  }
  useEffect(() => {
    handleSearchTicketsData()
  }, [ticketStatus, createdOn, createdOn, priority, sortBy])

  useEffect(() => {
    if (getDefaultTickets?.data) {
      setToDisPlayData(getDefaultTickets?.data)
    }
  }, [getDefaultTickets])
  useEffect(() => {
    if (filteredTicketsData?.data) {
      setToDisPlayData(filteredTicketsData?.data)
    }
  }, [filteredTicketsData])
  useEffect(() => {
    if (ticketsCount?.data) {
      const open = Number(ticketsCount?.data?.Open ?? 0);
      const pending = Number(ticketsCount?.data?.Pending ?? 0);
      const progress = Number(ticketsCount?.data?.Progress ?? 0);
      const solved = Number(ticketsCount?.data?.Solved ?? 0);

      const total = open + pending + progress;

      setOpenTicket(open);
      setPendingTickets(pending);
      setProgressTicket(progress);
      setSolvedTicket(solved);

      setAllTickets(total);
      setOverdueTicket(total); // same logic as before
    }
  }, [ticketsCount]);
  const [
    filteredTickets, {
      data: filteredData,
      isFetching: filteredFetching
    }
  ] = useLazySearchTicketByTicketIdQuery()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleSearchTicket = async () => {
    if (!ticket) {
      toast.warning('Please Enter Ticket Id')
    }
    filteredTickets({
      ticketID: ticket
    })
  }
  useEffect(() => {

    if (filteredData?.data) {
      setTicketData(filteredData?.data)
      setTicketModal(true)
    }

  }, [filteredData])

  useEffect(() => {
    if (searchKey === 0) return;

    if (searchKey === 0) {
      toast.warning('Please Enter Ticket Id');
      return;
    }

    filteredTickets({ ticketID: searchKey });

  }, [searchKey])



  if (filteredFetching || isFetching || isLoading) {
    return <Loader />
  }

  const paginatedData = toDisPlayData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const fields = [
    { label: "Ticket Type", key: "TicketType" },
    { label: "Order No", key: "OrderNo" },
    { label: "Tag Name", key: "TagName" },
    { label: "Agent Consultant Name", key: "AgentConsultationName" },
    { label: "Ticket Subtype", key: "TicketSubType" },
    { label: "Ticket Subtype (Others)", key: "TicketSubTypeOthers" },
    { label: "Department", key: "Department" },
    { label: "Comments (General Type)", key: "GeneralComments" },
    { label: "Current Ticket Status", key: "TicketStatus" },
    { label: "Current Ticket Priority", key: "TicketPriority" },
    { label: "Created By", key: "CreatedBy" },
    { label: "Created On", key: "CreatedOn" },
  ];

  const getStatusColor = (status) => {
    if (status === "Solved") return "success";
    if (status === "Open") return "primary";
    if (status === "Pending") return "warning";
    if (status === "Progress") return "info";
    return "default";
  };

  const getPriorityColor = (priority) => {
    if (priority === "Urgent") return "error";
    if (priority === "High") return "warning";
    if (priority === "Low") return "success";
    return "default";
  };

  const handleNavigate = (ptId) => {
    dispatch(setPatientId(ptId))
    dispatch(setPageName('Patient Details'));
    dispatch(setIcon('Patient'));
    dispatch(setRoute('patient-details'))
  }



  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <TextField label='Search with Ticket Id' size='small'
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
            />
            <Button variant='contained' color='success' onClick={handleSearchTicket} >Search Ticket Id</Button>
          </Box>
        </Grid>
        <Grid size={12} >
          <Button endIcon={<Refresh />} variant='contained'
            onClick={() => {
              refetchCount();
              refetchTickets();
              handleClearFilter()
            }}
          >Refresh Here For All Tickets</Button>
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
              alignItems: "center",
            }}
            onClick={() => setTicketStatus('Open,Progress,Pending')}
          >
            <Typography variant="h6" fontWeight={600}>
              All Tickets
            </Typography>
            <Typography variant="h4" color="primary">
              {Number(allTickets) || 0}
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
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography variant="h6" fontWeight={600}

            >
              Open
            </Typography>
            <Typography variant="h4" color="primary">
              {(Number(openTicket) + Number(pendingTicket) + Number(progressTicket)) || 0}
            </Typography>

          </Stack>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setTicketStatus('Open')
                handleClose()
              }}
            >{`Open (${openTicket || 0})`}</MenuItem>
            <MenuItem
              onClick={() => {
                setTicketStatus('Pending')
                handleClose()
              }}
            >{`Pending (${pendingTicket || 0})`}</MenuItem>
            <MenuItem
              onClick={() => {
                setTicketStatus('Progress')
                handleClose()
              }}
            >{`Progress (${progressTicket || 0})`}</MenuItem>

          </Menu>
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
            onClick={() => setTicketStatus('Open,Progress,Pending')}
          >
            <Typography variant="h6" fontWeight={600}>
              Overdue Tickets
            </Typography>
            <Typography variant="h4" color="primary">
              {Number(overdueTicket) || 0}
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
            onClick={() => setTicketStatus('Solved')}
          >
            <Typography variant="h6" fontWeight={600}>
              Solved
            </Typography>
            <Typography variant="h4" color="primary">
              {Number(solvedTicket) || 0}
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
                value={createdOn}
                onChange={(e) => setCreatedOn(e.target.value)}
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
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
                              <TableCell   >{item?.TicketID}</TableCell>
                              <TableCell>{item?.TicketStatus}</TableCell>
                              <TableCell
                                sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                onClick={() => handleNavigate(item?.PatientID)}
                              >{item?.PatientID}</TableCell>
                              <TableCell>{item?.CreatedBy}</TableCell>
                              {/* <TableCell>{`${dayjs(item?.CreatedOn).format('YYYY-MM-DD')}`}</TableCell> */}
                              <TableCell>{dayjs(ticketData.CreatedOn).fromNow()}</TableCell>
                              <TableCell
                                sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                onClick={() => setSearchKey(item?.TicketID)} >
                                {`View Ticket(${item?.ChildTicketCount})`}
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
      {/* tickets modal */}

      <CommonModal open={ticketModal} handleClose={() => setTicketModal(false)} width={900} >
        <Typography variant='h4' sx={{ fontSize: 20, fontWeight: 600 }} >Ticket History [Ticket ID - {ticketData?.TicketID}]</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid size={6} >
            <TableContainer component={Paper} elevation={3}
            >
              <Table>
                <TableBody>
                  {fields.map((field) => (
                    <TableRow key={field.key}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          width: "35%",
                          backgroundColor: "grey.100",
                          padding: "6px 8px",
                          fontSize: "0.7rem"
                        }}
                      >
                        {field.label}
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: "6px 8px",
                          fontSize: "0.7rem"
                        }}
                      >
                        {field.key === "TicketStatus" ? (
                          <Chip
                            label={ticketData?.[field.key] ?? "NIL"}
                            color={getStatusColor(ticketData?.[field.key])}
                            size="small"
                          />
                        ) : field.key === "TicketPriority" ? (
                          <Chip
                            label={ticketData?.[field.key] ?? "NIL"}
                            color={getPriorityColor(ticketData?.[field.key])}
                            size="small"
                          />
                        ) : field.key === "CreatedOn" ? (
                          <Typography variant="body2">
                            {ticketData?.CreatedOn
                              ? dayjs(ticketData.CreatedOn).fromNow()
                              : "NIL"}
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            {ticketData?.[field.key] || "NIL"}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
           
          </Grid>
          <Grid size={12} >
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    {
                      head1.map((header, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            // color: "#fff",
                            fontWeight: 600,
                            border: "1px solid #ccc",
                            fontSize: "0.7rem"
                          }}
                        >
                          {header}
                        </TableCell>
                      ))
                    }
                  </TableHead>
                  <TableBody>

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={ticketIssue?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Paper>
          </Grid>
        </Grid>
      </CommonModal>

    </Container>
  )
}

export default Tickets