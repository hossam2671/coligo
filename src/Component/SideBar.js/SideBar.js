import React from "react";
import style from "./SideBar.module.css"

function SideBar() {
  return (
    <div className={style["sideBar"]}>
      <h1>Coligo</h1>
      <ul>
        <li className={style["active"]}>
          <i class="fa-solid fa-house-chimney"></i>
          <span>DashBoard</span>
        </li>
        <li>
          <i class="fa-solid fa-calendar-days"></i>
          <span>Schedule</span>
        </li>
        <li>
          <i class="fa-solid fa-scroll"></i>
          <span>Courses</span>
        </li>
        <li>
          <i class="fa-solid fa-graduation-cap"></i>
          <span>GradeBook</span>
        </li>
        <li>
          <i class="fa-solid fa-chart-line"></i>
          <span>Performance</span>
        </li>
        <li>
          <i class="fa-solid fa-bullhorn"></i>
          <span>Announcement</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
