import { Box, Modal } from '@mui/material'
import React from 'react'

const CommonModal = ({ children, open, handleClose, width }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={
                {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: width ?? 400,
                    bgcolor: 'background.paper',
                    // border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius:2,
                    height:"90vh",
                    overflow:"hidden"
                }
            }>
                {children}
            </Box>
        </Modal>
    )
}

export default CommonModal