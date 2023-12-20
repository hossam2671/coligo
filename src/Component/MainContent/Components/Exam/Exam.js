import React from "react";
import Button from "@mui/material/Button";
import exam from "../../../../images/exam.jpg";
import style from "./Exam.module.css";
function Exam() {
  return (
    <div className={style["exam"]}>
      <div className={style["text"]}>
        <h2>Exams Times</h2>
        <h4>
          Here We Are, Are you ready? Here We Are, Are you ready? Here We Are,
          Are you ready? Here We Are, Are you ready? Here We Are, Are you ready?
        </h4>
        <h5>"nothing happens until until something moves" Albert Einsten</h5>
        <Button variant="contained">View Exam Tips</Button>
      </div>
      <div className={style["img"]}>
        <img src={exam} />
      </div>
    </div>
  );
}

export default Exam;
