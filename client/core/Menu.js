import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import auth from "../auth/auth-helper";

const Menu = () => {
  const location = useLocation();
  const userId = auth?.isAuthenticated()?.user?._id;
  const navigate = useNavigate();

  const isActive = (path) => {
    if (location.pathname == path) return { color: "#ff4081" };
    else return { color: "#ffffff" };
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' color='inherit'>
          MERN Skeleton
        </Typography>
        <Link to='/'>
          <IconButton aria-label='Home' style={isActive("/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to='/users'>
          <Button style={isActive("/users")}>Users</Button>
        </Link>
        {auth.isAuthenticated() ? (
          <span>
            <Link to={`/user/${userId}`}>
              <Button style={isActive(`/user/${userId}`)}>My Profile</Button>
            </Link>
            <Button
              color='inherit'
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        ) : (
          <span>
            <Link to='/signup'>
              <Button style={isActive("/signup")}> Sign Up </Button>
            </Link>
            <Link to='/signin'>
              <Button style={isActive("/signin")}> Sign In </Button>
            </Link>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
