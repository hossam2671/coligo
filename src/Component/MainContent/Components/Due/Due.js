import React, { useEffect, useState } from "react";
import style from "./Due.module.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik, Form } from "formik";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "../../../../utils/ToastifyMessage";
import { useDispatch } from "react-redux";
import { dues as due } from "../../../../Redux/Slices/Main";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  maxWidth: "80vw",
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "8px",
  boxShadow: 24,
  padding: "0 0 12px",
  bgcolor: "background.paper",
};

function Due() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [dues, setDues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/due/getDues").then((res) => {
      setDues(res.data);
      dispatch(due(res.data.length));
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function formatDateString(originalDateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(originalDateString)
    );
    return formattedDate;
  }

  function deleteDue(id) {
    axios.delete(`http://localhost:5000/due/deleteDue/${id}`).then(() => {
      axios.get("http://localhost:5000/due/getDues").then((res) => {
        showToast("Successfully Deleted!", 2000, "success");
        setDues(res.data);
        dispatch(due(res.data.length));
      });
    });
  }

  function submit(value) {
    if (value.submit === "add") {
      axios
        .post("http://localhost:5000/due/addDue", value)
        .then(() => {
          axios.get("http://localhost:5000/due/getDues").then((res) => {
            showToast("Successfully Added!", 2000, "success");
            handleClose();
            setDues(res.data);
            dispatch(due(res.data.length));
          });
        })
        .catch((error) => {
          showToast(error.response.data.message, 2000, "error");
        });
    } else if (value.submit === "update") {
      axios
        .put(`http://localhost:5000/due/updateDue/${value.id}`, value)
        .then((res) => {
          axios.get("http://localhost:5000/due/getDues").then((res) => {
            showToast("Successfully Updated!", 2000, "success");
            handleClose();
            setDues(res.data);
            dispatch(due(res.data.length));
          });
        });
    }
  }

  const renderTypeIcon = (type) => {
    return type === "quiz" ? (
      <i className="fa-solid fa-colon-sign"></i>
    ) : (
      <i className="fa-solid fa-id-badge"></i>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 3;
  return (
    <Formik
      initialValues={{
        topic: "",
        course: "",
        date: dayjs().$d,
        type: "",
        title: "",
        submit: "add",
        id: "",
      }}
      onSubmit={(values) => submit(values)}
    >
      {({ setFieldValue, values }) => (
        <div className={style["due"]}>
          <ToastContainer />
          <div className={style["header"]}>
            <div className={style["title"]}>
              <h2>What's due</h2>
              <h4>lorem lorem lorem lorem</h4>
            </div>
            <Button
              onClick={() => {
                handleOpen();
                setFieldValue("type", "");
                setFieldValue("course", "");
                setFieldValue("title", "");
                setFieldValue("topic", "");
                setFieldValue("date", "");
                setFieldValue("id", "");
                setFieldValue("submit", "add");
              }}
              variant="contained"
            >
              Add
            </Button>
          </div>
          <div className={style["quizes"]}>
            {dues?.slice(startIndex, endIndex).map((due, index) => (
              <div key={index} className={style["quiz"]}>
                <div className={style["theQuiz"]}>
                  <div className={style["title"]}>
                    {renderTypeIcon(due.type)}
                    <h4>{due.title}</h4>
                  </div>
                  <div className={style["content"]}>
                    <h4>Course</h4>
                    <h5>{due.course}</h5>
                  </div>
                  <div className={style["content"]}>
                    <h4>Topic</h4>
                    <h5>{due.topic}</h5>
                  </div>
                  <div className={style["content"]}>
                    <h4>Date</h4>
                    <h5>{formatDateString(due.date)}</h5>
                  </div>
                  <Button variant="outlined">
                    {due.type === "quiz" ? "Start quiz" : "Solve Assignment"}
                  </Button>
                </div>
                <div className={style["icons"]}>
                  <i
                    onClick={() => {
                      axios
                        .get(`http://localhost:5000/due/getDueById/${due?._id}`)
                        .then((res) => {
                          handleOpen();
                          setFieldValue("type", res.data.type);
                          setFieldValue("course", res.data.course);
                          setFieldValue("title", res.data.title);
                          setFieldValue("topic", res.data.topic);
                          setFieldValue("date", res.data.date);
                          setFieldValue("id", res.data._id);
                          setFieldValue("submit", "update");
                        });
                    }}
                    class="fa-solid fa-pen"
                  ></i>
                  <i
                    onClick={() => deleteDue(due._id)}
                    class="fa-solid fa-xmark"
                  ></i>
                </div>
              </div>
            ))}
          </div>
          {dues.length > 3 && (
            <div className={style["pagination"]}>
              {Array.from(
                { length: Math.ceil(dues.length / 3) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  backgroundColor: "#153D77",
                  padding: "10px 20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "white",
                  }}
                  variant="h3"
                >
                  Add Due
                </Typography>
                <i
                  onClick={handleClose}
                  style={{ color: "white", cursor: "pointer" }}
                  class="fa-solid fa-xmark"
                ></i>
              </Box>

              <Form>
                <FormControl
                  sx={{
                    margin: "10px 20px",
                    width: "90%",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.type}
                    label="Type"
                    name="type"
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    <MenuItem value={"quiz"}>Quiz</MenuItem>
                    <MenuItem value={"assignment"}>Assignment</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ margin: "10px 20px", width: "90%" }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={values.title}
                  onChange={(e) => setFieldValue("title", e.target.value)}
                />
                <TextField
                  sx={{ margin: "10px 20px", width: "90%" }}
                  id="outlined-basic"
                  label="Course"
                  variant="outlined"
                  name="course"
                  value={values.course}
                  onChange={(e) => setFieldValue("course", e.target.value)}
                />
                <TextField
                  sx={{ margin: "10px 20px", width: "90%" }}
                  id="outlined-basic"
                  label="Topic"
                  name="topic"
                  value={values.topic}
                  variant="outlined"
                  onChange={(e) => setFieldValue("topic", e.target.value)}
                />
                <div style={{ margin: "10px 20px", width: "90%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        onChange={(e) => setFieldValue("date", e.$d)}
                        defaultValue={
                          values.date ? dayjs(values?.date) : dayjs()
                        }
                        minDate={dayjs()}
                        name="date"
                        label="Basic date time picker"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#5cc1b7",
                    borderRadius: "8px",
                    marginLeft: "50%",
                    transform: "translateX(-50%)",
                  }}
                  variant="contained"
                >
                  Add
                </Button>
              </Form>
            </Box>
          </Modal>
        </div>
      )}
    </Formik>
  );
}

export default Due;
