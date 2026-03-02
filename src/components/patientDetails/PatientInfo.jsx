import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const PatientInfo = () => {
    const user = useSelector(state => state.user)

    const SectionCard = ({ title, children }) => (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {children}
        </Paper>
    );

    return (
        <Box
            sx={{
                backgroundColor: "#f2f2f2",
                minHeight: "100vh",
                p: 3,
            }}
        >
            <Paper elevation={1} sx={{ p: 3 }}>
                <Grid container spacing={2}>

                    {/* LEFT COLUMN */}
                    <Grid size={{ xs: 12, md: 6 }} >
                        <TextField fullWidth label="Customer ID" size="small" defaultValue="P03951213" margin="dense" />
                        <TextField fullWidth label="Mobile No." size="small" defaultValue="XXXXXXXXXX" margin="dense" />
                        <TextField fullWidth label="Alternate Mobile 2" size="small" margin="dense" />
                        <TextField fullWidth label="Son Of" size="small" defaultValue="GAJANAND DIGAMBAR WAGHMARE" margin="dense" />
                        <TextField fullWidth label="Landmark" size="small" defaultValue="NEAR BY - GUNA AUSA ROAD & KIRANA STORE" margin="dense" />
                        <TextField fullWidth label="Tehsil" size="small" defaultValue="Latur" margin="dense" />
                        <TextField fullWidth label="Pincode" size="small" defaultValue="413512" margin="dense" />
                        <TextField fullWidth label="District" size="small" defaultValue="Latur" margin="dense" />
                    </Grid>

                    {/* RIGHT COLUMN */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Customer Name" size="small" defaultValue="GAJANAND DIGAMBAR WAGHMARE" margin="dense" />
                        <TextField fullWidth label="Alternate Mobile" size="small" margin="dense" />
                        <TextField fullWidth label="Guardian" size="small" defaultValue="Care of" margin="dense" />
                        <TextField fullWidth label="House No." size="small" defaultValue="RENT HOUSE" margin="dense" />
                        <TextField fullWidth label="Landmark 2" size="small" defaultValue="NEAR BY - RADHA KRISHAN MANDIR" margin="dense" />
                        <TextField fullWidth label="City" size="small" defaultValue="Latur" margin="dense" />
                        <TextField fullWidth label="Post" size="small" defaultValue="Latur H.O" margin="dense" />
                        <TextField fullWidth label="State" size="small" defaultValue="MAHARASHTRA" margin="dense" />
                    </Grid>

                    {/* COMMENT FULL WIDTH */}
                    <Grid size={{ xs: 12, md: 12 }}>
                        <TextField
                            fullWidth
                            label="Comment"
                            multiline
                            rows={3}
                            size="small"
                            defaultValue="VERIFY BY LZMA3100...........@2115/"
                            margin="dense"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Divider />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        {/* ORDER DETAILS */}
                        <SectionCard title="Order Details">
                            <Grid container spacing={2}>
                                <Grid size={{xs:12,md:4}} >
                                    <TextField fullWidth size="small" label="Order ID" defaultValue="4685578" InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Order By" defaultValue="MehboobBTZ" InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Date & Time" defaultValue="2025-10-28 12:04:47" InputProps={{ readOnly: true }} />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        {/* PAYMENT DETAILS */}
                        <SectionCard title="Payment Details">
                            <Grid container spacing={2}>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Gross Amount" defaultValue="2350" InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Courier Charge" defaultValue="0" InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Discount" defaultValue="235" InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid size={{xs:12,md:4}}>
                                    <TextField fullWidth size="small" label="Total Amount" defaultValue="2115" InputProps={{ readOnly: true }} />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        {/* PRODUCT DETAILS */}
                        <SectionCard title="Product Details">
                            <TableContainer component={Paper} elevation={0}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#5e7562" }}>
                                            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Product Name</TableCell>
                                            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Quantity</TableCell>
                                            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Rate</TableCell>
                                            <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Goond Siyah (Kala Goond)</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell>1600</TableCell>
                                            <TableCell>1600</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>HALDI_PILLS</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell>750</TableCell>
                                            <TableCell>750</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </SectionCard>
                    </Grid>

                </Grid>
            </Paper>
        </Box>
    )
}

export default PatientInfo