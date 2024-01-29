import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import auth from "../auth/auth-helper";
import { remove } from "./api-course";

const DeleteCourse = ({ course, onRemove }) => {
  const [open, setOpen] = useState(false);
  const jwt = auth?.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteCourse = () => {
    const data = remove(course?._id, jwt.token);
    if (data.error) {
      console.log(data.error);
    } else {
      setOpen(false);
      onRemove(course);
    }
  };

  return (
    <span>
      <IconButton aria-label='Delete' onClick={clickButton} color='secondary'>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + course?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your course {course?.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={deleteCourse}
            color='secondary'
            autoFocus='autoFocus'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteCourse;
