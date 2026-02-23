import { Refresh } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, TextField, Typography, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useCreateMyNoteMutation, useGetMyNotesQuery } from '../stores/services/mynotesApi';
import { toast } from 'react-toastify';
import { skipToken } from '@reduxjs/toolkit/query';

const MyNotes = () => {
  const user = useSelector(state => state.user.agent)
  const [text, setText] = useState("");
  const [toDisPlayData, setToDisPlayData] = useState([])
  const [createMyNote] = useCreateMyNoteMutation()
  const { data: defaultData } = useGetMyNotesQuery(
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

  console.log({toDisPlayData});
  

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} padding={2} >
        <Grid size={12} >
          <Button variant='contained' endIcon={<Refresh />} >Refresh</Button>
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
      </Grid>
    </Container>
  )
}

export default MyNotes