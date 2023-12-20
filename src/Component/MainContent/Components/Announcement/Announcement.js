import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import style from "./Announcement.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "../../../../utils/ToastifyMessage";
import { useDispatch } from "react-redux";
import { annons } from "../../../../Redux/Slices/Main";

const stylee = {
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

function Announcement() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [announ, setAnnoun] = useState("");
  const [announs, setAnnouns] = useState([]);
  const [submited, setSubmited] = useState("");
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/announcment/getAnnouncment")
      .then((res) => {
        setAnnouns(res.data);
        dispatch(annons(res.data.length));
      });
  }, []);

  function deleteAnnoun(id) {
    axios
      .delete(`http://localhost:5000/announcment/deleteAnnouncement/${id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/announcment/getAnnouncment")
          .then((res) => {
            showToast("Successfully Deleted!", 2000, "success");
            setAnnouns(res.data);
            dispatch(annons(res.data.length));
          });
      });
  }

  function submit() {
    if (submited === "add") {
      axios
        .post("http://localhost:5000/announcment/addAnnouncment", {
          user: localStorage.getItem("user"),
          announcment: announ,
        })
        .then((res) => {
          handleClose();
          setAnnoun("");
          setSubmited("");
          axios
            .get("http://localhost:5000/announcment/getAnnouncment")
            .then((res) => {
              showToast("Successfully Added!", 2000, "success");
              setAnnouns(res.data);
              dispatch(annons(res.data.length));
            });
        })
        .catch((error) => {
          showToast(error.response.data.message, 2000, "error");
        });
    } else if (submited === "edit") {
      axios
        .put(`http://localhost:5000/announcment/updateAnnouncement/${id}`, {
          announcment: announ,
        })
        .then((res) => {
          handleClose();
          setAnnoun("");
          setSubmited("");
          axios
            .get("http://localhost:5000/announcment/getAnnouncment")
            .then((res) => {
              showToast("Successfully Updated!", 2000, "success");
              setAnnouns(res.data);
              dispatch(annons(res.data.length));
            });
        })
        .catch((error) => {
          showToast(error.response.data.message, 2000, "error");
        });
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  return (
    <div className={style["announcement"]}>
      <ToastContainer />
      <div className={style["header"]}>
        <div className={style["title"]}>
          <h2>Announcement</h2>
          <h4>lorem lorem lorem lorem</h4>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setSubmited("add");
            handleOpen();
          }}
        >
          Add
        </Button>
      </div>
      <div className={style["content"]}>
        {announs?.slice(startIndex, endIndex).map((announ, index) => (
          <div key={index} className={style["announ"]}>
            <div className={style["info"]}>
              <Avatar
                sx={{ marginRight: "20px" }}
                alt="Rmy Sharp"
                src={`http://localhost:5000/${announ.user.img}`}
              />
              <div className={style["text"]}>
                <h3>{announ.user.name}</h3>
                <h4>{announ.user.departement}</h4>
              </div>
            </div>
            <div className={style["theAnnoun"]}>
              <h4>{announ.announcement}</h4>
              {announ.user._id === localStorage.getItem("user") && (
                <>
                  <i
                    onClick={() => {
                      setAnnoun(announ.announcement);
                      handleOpen();
                      setSubmited("edit");
                      setId(announ._id);
                    }}
                    class="fa-solid fa-pen"
                  ></i>
                  <i
                    onClick={() => {
                      deleteAnnoun(announ._id);
                    }}
                    class="fa-solid fa-xmark"
                  ></i>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {annons.length > 10 && (
        <div className={style["pagination"]}>
          {Array.from(
            { length: Math.ceil(announs.length / 10) },
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
        <Box sx={stylee}>
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
              Add Announcement
            </Typography>
            <i
              onClick={handleClose}
              style={{ color: "white", cursor: "pointer" }}
              class="fa-solid fa-xmark"
            ></i>
          </Box>
          <TextField
            sx={{ margin: "10px 20px", width: "90%" }}
            id="outlined-basic"
            label="Annoncement"
            variant="outlined"
            value={announ}
            onChange={(e) => setAnnoun(e.target.value)}
          />
          <Button
            onClick={submit}
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
        </Box>
      </Modal>
    </div>
  );
}

export default Announcement;
