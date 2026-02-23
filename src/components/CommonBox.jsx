import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

// 🔥 Import all icons you use
import HomeIcon from "@mui/icons-material/Home";
import CompostIcon from "@mui/icons-material/Compost";
import PeopleIcon from "@mui/icons-material/People";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BugReportIcon from "@mui/icons-material/BugReport";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CallMadeIcon from "@mui/icons-material/CallMade";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InsightsIcon from "@mui/icons-material/Insights";
import FeedbackIcon from "@mui/icons-material/Feedback";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PolicyIcon from "@mui/icons-material/Policy";

// 🔥 Central icon map
const iconMap = {
  Home: HomeIcon,
  Compost: CompostIcon,
  People: PeopleIcon,
  PermContactCalendar: PermContactCalendarIcon,
  AddModerator: AddModeratorIcon,
  LocalHospital: LocalHospitalIcon,
  BarChart: BarChartIcon,
  Search: SearchIcon,
  EventNote: EventNoteIcon,
  BugReport: BugReportIcon,
  Assignment: AssignmentIcon,
  ConfirmationNumber: ConfirmationNumberIcon,
  Add: AddIcon,
  NotificationsActive: NotificationsActiveIcon,
  DataThresholding: DataThresholdingIcon,
  FollowTheSigns: FollowTheSignsIcon,
  RemoveCircleOutline: RemoveCircleOutlineIcon,
  CallMade: CallMadeIcon,
  TrendingUp: TrendingUpIcon,
  PhonePaused: PhonePausedIcon,
  EditNote: EditNoteIcon,
  Insights: InsightsIcon,
  Feedback: FeedbackIcon,
  Visibility: VisibilityIcon,
  Policy: PolicyIcon,
};

const CommonBox = ({ children }) => {
  const { pageName, icon } = useSelector((state) => state.common);

  const IconComponent = iconMap[icon];

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          width: "100%",
          boxShadow: 3,
          backgroundColor: "#fff",
          mt: 2,
          borderRadius: 3,
          py: 2,
        }}
      >
        <Box
          sx={{
            width: "96%",
            mx: "auto",
            height: 70,
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            pl: 2,
            borderRadius: 2,
            color: "#5f7a65",
          }}
        >
          {IconComponent && <IconComponent sx={{ mr: 1 }} />}

          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            {pageName}
          </Typography>
        </Box>

        {children}
      </Box>
    </Container>
  );
};

export default CommonBox;