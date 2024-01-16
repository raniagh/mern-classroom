import React, { useEffect, useState } from "react";
import { list } from "./api-user";
import {
  Avatar,
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
import { Link } from "react-router-dom";
import { ArrowForward, Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define an asynchronous function to fetch the user list
    const fetchUserList = async (signal) => {
      const data = await list(signal);
      if (data && data.error) {
        console.error(data.error);
      } else {
        setUsers(data);
      }
    };
    // Create an AbortController and get its signal
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchUserList(signal);

    // Cleanup function to abort the ongoing asynchronous operation
    return () => abortController.abort();
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant='h6' className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};

export default Users;
