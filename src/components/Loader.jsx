import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {

    return (
        <Backdrop
            open={true}
            sx={(theme) => ({
                zIndex: theme.zIndex.modal + 1,
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
            })}
        >
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    padding: 4,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    boxShadow: theme.shadows[6],
                    minWidth: 260,
                })}
            >
                <CircularProgress color="primary" />

                <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{
                        animation: "pulse 1.5s ease-in-out infinite",
                        "@keyframes pulse": {
                            "0%": { opacity: 0.4 },
                            "50%": { opacity: 1 },
                            "100%": { opacity: 0.4 },
                        },
                    }}
                >
                    Loading, please wait...
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default Loader;