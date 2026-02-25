import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InboundLead from "./pages/InboundLead";
import DirectConsulation from "./pages/DirectConsulation";
import VerificationConsultation from "./pages/VerificationConsultation";
import DoctorHelp from "./pages/DoctorHelp";
import TodayStatics from "./pages/TodayStatics";
import SearchPatients from "./pages/SearchPatients";
import TodayRemider from "./pages/TodayRemider";
import Hold from "./pages/Hold";
import FollowUp from "./pages/FollowUp";
import ConfirmDareLater from "./pages/ConfirmDareLater";
import CallBack from "./pages/CallBack";
import NonContract from "./pages/NonContract";
import SubmitIssues from "./pages/SubmitIssues";
import AgentPerformanceReport from "./pages/AgentPerformanceReport";
import TodayCallReport from "./pages/TodayCallReport";
import CallListenAudio from "./pages/CallListenAudio";
import QualityObservation from "./pages/QualityObservation";
import ComplienceAudit from "./pages/ComplienceAudit";
import Tickets from "./pages/Tickets";
import FeedbackCalling from "./pages/FeedbackCalling";
import MyNotes from "./pages/MyNotes";

import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  setSessionId,
  setCampaignId,
  setAgent,
} from "./stores/features/userSlice";
import { useGetAgentIdQuery } from "./stores/services/userApi";
import { skipToken } from "@reduxjs/toolkit/query";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const common=useSelector(state=>state.common)

  
  const { data: defaultAgentDetails } = useGetAgentIdQuery(
    user.userId ? {
      userId: user.userId
    }
      :
      skipToken
  )
  // 🔥 READ QUERY PARAMS & STORE IN REDUX
  useEffect(() => {
    const decodedQuery = window.location.search.replaceAll("&amp;", "&");

    const params = new URLSearchParams(decodedQuery);

    const userId = params.get("userId");
    const sessionId = params.get("sessionId");
    const campaignId = params.get("campaignId");


    // console.log({ userId, sessionId, campaignId });

    if (userId) dispatch(setUserId(userId));
    if (sessionId) dispatch(setSessionId(sessionId));
    if (campaignId) dispatch(setCampaignId(campaignId));
  }, [dispatch]);

  useEffect(()=>{
    if (defaultAgentDetails?.data) {
       dispatch(setAgent(defaultAgentDetails?.data))
    }
  },[defaultAgentDetails])

  

  const renderPage = () => {
    switch (common.route) {
      case "inbound":
        return <InboundLead />;
      case "consult1":
        return <DirectConsulation />;
      case "consult2":
        return <VerificationConsultation />;
      case "doctorHelp":
        return <DoctorHelp />;
      case "todayStats":
        return <TodayStatics />;
      case "search":
        return <SearchPatients />;
      case "today-reminder":
        return <TodayRemider />;
      case "hold":
        return <Hold />;
      case "follow-up":
        return <FollowUp />;
      case "confirm-date-latter":
        return <ConfirmDareLater />;
      case "call-back":
        return <CallBack />;
      case "non-contract":
        return <NonContract />;
      case "submit-issues":
        return <SubmitIssues />;
      case "agent-performance-report":
        return <AgentPerformanceReport />;
      case "today-call-report":
        return <TodayCallReport />;
      case "call-listen-audio":
        return <CallListenAudio />;
      case "qaulity-observation":
        return <QualityObservation />;
      case "complience-audit":
        return <ComplienceAudit />;
      case "tickets":
        return <Tickets />;
      case "feedback-calling":
        return <FeedbackCalling />;
      case "my-notes":
        return <MyNotes />;
      default:
        return <Home />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

export default App;