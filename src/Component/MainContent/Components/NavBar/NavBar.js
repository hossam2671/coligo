import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import avatar from "../../../../images/avatar.png";
import style from "./NavBar.module.css";
import axios from "axios";
import { useSelector , useDispatch } from "react-redux";
import { log } from '../../../../Redux/Slices/Main'



function NavBar() {
  const dispatch = useDispatch()
  const {announcment,dues , isLogged } = useSelector(state=>state.MainSlice)

  const [user, setUser] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("user");
    if (id) {
      axios.get(`http://localhost:5000/auth/getUserById/${id}`).then((res) => {
        dispatch(log(true))
        setUser(res.data);
      }).catch((error)=>{

      })
    }
  }, []);
  function logout(){
    localStorage.removeItem("user")
    setUser({})
    dispatch(log(false))
  }
  function login() {
    axios.post("http://localhost:5000/auth/login").then((res) => {
      setUser(res.data);
      localStorage.setItem("user", res.data._id);
      dispatch(log(true))
    });
  }
  return (
    <div className={style["navBar"]}>
      {
        isLogged ?
      <h3>Welcome {user?.name},</h3>:
      <h3>Login to show your dues</h3>
      }
      <div className={style["content"]}>
        {
          isLogged &&
          <>
        <input placeholder="Search"></input>
        <div className={style["notify"]}>
          <i class="fa-solid fa-bell"></i>
          <span>{announcment}</span>
        </div>
        <div className={style["notify"]}>
          <i class="fa-solid fa-envelope"></i>
          <span>{dues}</span>
        </div>
        <Avatar
          sx={{ marginRight: "30px" }}
          alt="Rmy Sharp"
          src={`http://localhost:5000/${user?.img}`}
        />
          </>
        }
        {isLogged ? (
          <Button onClick={logout} variant="contained">
            LogOut
          </Button>
        ) : (
          <Button onClick={login} variant="contained">
            LogIn
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
