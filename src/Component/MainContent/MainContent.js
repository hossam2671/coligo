import React from "react";
import style from "./MainContent.module.css";
import NavBar from "./Components/NavBar/NavBar";
import Exam from "./Components/Exam/Exam";
import Announcement from "./Components/Announcement/Announcement";
import Due from "./Components/Due/Due";
import RequireAuth from '../RequireAuth/RequireAuth';

const AuthenticatedAnnouncement= RequireAuth(Announcement);
const AuthenticatedDue= RequireAuth(Due);



function MainContent() {
  return (
    <div className={style["mainContent"]}>
      <NavBar />
      <Exam />
      <div className={style["content"]} >
        <AuthenticatedAnnouncement />
        <AuthenticatedDue />
      </div>
    </div>
  );
}

export default MainContent;
