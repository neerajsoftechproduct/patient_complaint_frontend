import { Typography, Paper, Box, Container, Grid } from "@mui/material";
import AnnouncementBlock from "../components/AnnouncementBlock";

const Home = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} mt={2} border="1px solid #ddd" borderRadius={2} >
                <Grid size={12}>
                    <Typography sx={{
                        backgroundColor: "#ddd",
                        height: 50,
                        paddingLeft: 2,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        fontSize: 20,
                        fontWeight: 600,
                        color:"#5f7a65",
                        alignItems:"center",
                        display:"flex"
                    }} >Incentive Targets</Typography>
                    <AnnouncementBlock />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;