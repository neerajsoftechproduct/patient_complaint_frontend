import React, { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import CompostIcon from "@mui/icons-material/Compost";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BugReportIcon from "@mui/icons-material/BugReport";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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

import CommonBox from "./CommonBox";
import { useDispatch } from "react-redux";
import { setIcon, setPageName } from "../stores/features/commonSlices";


// ================= ICON MAP =================
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


// ================= MENU CONFIG (STRING ICONS) =================
const menuItems = [
  { label: "Home", icon: "Home", path: "home" },
  { label: "InBound Leads", icon: "Compost", path: "inbound" },
  {
    label: "Consultations",
    icon: "People",
    dropdown: [
      { label: "Direct Consultation", icon: "PermContactCalendar", path: "consult1" },
      { label: "Verification Consultation", icon: "AddModerator", path: "consult2" },
    ],
  },
  { label: "Doctor Help", icon: "LocalHospital", path: "doctorHelp" },
  { label: "Today's Statistics", icon: "BarChart", path: "todayStats" },
  { label: "Search PatientID", icon: "Search", path: "search" },
  {
    label: "Appointment",
    icon: "EventNote",
    dropdown: [
      { label: "Today's Reminder", icon: "NotificationsActive", path: "today-reminder" },
      { label: "Hold", icon: "DataThresholding", path: "hold" },
      { label: "Follow-Up", icon: "FollowTheSigns", path: "follow-up" },
      { label: "Confirm Date Later", icon: "EventNote", path: "confirm-date-latter" },
      { label: "Call Back", icon: "CallMade", path: "call-back" },
      { label: "Non-Contract", icon: "RemoveCircleOutline", path: "non-contract" },
    ],
  },
  {
    label: "IT Issue",
    icon: "BugReport",
    dropdown: [
      { label: "Submit Issues", icon: "BugReport", path: "submit-issues" },
    ],
  },
  {
    label: "Statistics",
    icon: "BarChart",
    dropdown: [
      { label: "Agent Performance Report", icon: "TrendingUp", path: "agent-performance-report" },
      { label: "Today Call Report", icon: "Insights", path: "today-call-report" },
    ],
  },
  {
    label: "Audits",
    icon: "Assignment",
    dropdown: [
      { label: "Call Listen Audio", icon: "PhonePaused", path: "call-listen-audio" },
      { label: "Qaulity Observation", icon: "Visibility", path: "qaulity-observation" },
      { label: "Complience Audit", icon: "Policy", path: "complience-audit" },
    ],
  },
  { label: "Tickets", icon: "ConfirmationNumber", path: "tickets" },
  {
    label: "More",
    icon: "Add",
    dropdown: [
      { label: "Feedback Calling", icon: "Feedback", path: "feedback-calling" },
      { label: "My Notes", icon: "EditNote", path: "my-notes" },
    ],
  },
];


// ================= LAYOUT COMPONENT =================
const Layout = ({ children, navigate }) => {
  const dispatch = useDispatch();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [currentDropdown, setCurrentDropdown] = useState(null);

  const handleOpen = (event, label) => {
    setMenuAnchor(event.currentTarget);
    setCurrentDropdown(label);
  };

  const handleClose = () => {
    setMenuAnchor(null);
    setCurrentDropdown(null);
  };

  const handleSetPath = (label, iconName) => {
    dispatch(setPageName(label));
    dispatch(setIcon(iconName)); // now safe (string)
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#5f7a65" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "nowrap",
              width: "100%",
              justifyContent: "center",
              py: 2,
            }}
          >
            {menuItems.map((item) => {
              const IconComponent = iconMap[item.icon];

              return item.dropdown ? (
                <Box key={item.label}>
                  <Button
                    color="inherit"
                    onClick={(e) => handleOpen(e, item.label)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textTransform: "none",
                      fontSize: 12,
                      minWidth: 70,
                    }}
                  >
                    {IconComponent && <IconComponent />}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                      {item.label}
                      <ArrowDropDownIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Button>

                  <Menu
                    anchorEl={menuAnchor}
                    open={currentDropdown === item.label}
                    onClose={handleClose}
                  >
                    {item.dropdown.map((sub) => {
                      const SubIcon = iconMap[sub.icon];

                      return (
                        <MenuItem
                          key={sub.label}
                          onClick={() => {
                            handleSetPath(sub.label, sub.icon);
                            navigate(sub.path);
                            handleClose();
                          }}
                        >
                          <ListItemIcon>
                            {SubIcon && <SubIcon />}
                          </ListItemIcon>
                          <ListItemText>{sub.label}</ListItemText>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => {
                    handleSetPath(item.label, item.icon);
                    navigate(item.path);
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textTransform: "none",
                    fontSize: 12,
                    minWidth: 70,
                  }}
                >
                  {IconComponent && <IconComponent />}
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <CommonBox>{children}</CommonBox>
      </Box>
    </Box>
  );
};

export default Layout;