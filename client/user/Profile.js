import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Edit, Person } from "@material-ui/icons";
import { read } from "./api-user";
import auth from "../auth/auth-helper";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();
  const authentication = auth.isAuthenticated();
  const token = authentication.token;

  useEffect(() => {
    // Define an asynchronous function to fetch the user list
    const fetchUser = async (signal) => {
      if (!token) {
        navigate("/signin");
      }
      const data = await read(userId, token, signal);
      if (data && data.error) {
        navigate("/signin");
      } else {
        setUser(data);
      }
    };
    // Create an AbortController and get its signal
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchUser(signal);

    // Cleanup function to abort the ongoing asynchronous operation
    return () => abortController.abort();
  }, [userId]);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant='h6' className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.email} />
          {authentication?.user?._id === userId && (
            <ListItemSecondaryAction>
              <Link to={`/user/edit/${userId}`}>
                <IconButton aria-label='Edit' color='primary'>
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={userId} token={token} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user?.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
