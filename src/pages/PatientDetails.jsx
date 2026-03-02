import { Box, Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import PatientInfo from '../components/patientDetails/PatientInfo';
import PreviousCallHistory from '../components/patientDetails/PreviousCallHistory';
import PreviousOrderHistory from '../components/patientDetails/PreviousOrderHistory';
import TrackOrders from '../components/patientDetails/TrackOrders';
import PatientHistory from '../components/patientDetails/PatientHistory';
const PatientDetails = () => {
    const user = useSelector(state => state.user)
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Container maxWidth="xl" >
            <Grid container spacing={4} mt={2} >
                <Grid size={12} >
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Patient Details" value="1" />
                                    <Tab label="Patient History" value="2" />
                                    <Tab label="Previous Call History" value="3" />
                                    <Tab label="Previous Order History" value="4" />
                                    <Tab label="Track Orders" value="5" />

                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <PatientInfo />
                            </TabPanel>
                            <TabPanel value="2">
                                <PatientHistory />
                            </TabPanel>
                            <TabPanel value="3">
                                <PreviousCallHistory />
                            </TabPanel>
                            <TabPanel value="4">
                                <PreviousOrderHistory />
                            </TabPanel>
                            <TabPanel value="5">
                                <TrackOrders />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientDetails