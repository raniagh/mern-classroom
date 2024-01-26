import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
} from "@material-ui/core";

import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { newLesson } from "./api-course";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 500,
  },
}));

const NewLesson = ({ courseId, addLesson }) => {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const token = jwt?.token;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    resource_url: "",
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = async () => {
    const lesson = {
      title: values.title || undefined,
      content: values.content || undefined,
      resource_url: values.resource_url || undefined,
    };

    const data = await newLesson(courseId, lesson, token);
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      addLesson(data);
      setValues({ ...values, title: "", content: "", resource_url: "" });
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        aria-label='Add Lesson'
        color='primary'
        variant='contained'
        onClick={handleClickOpen}
      >
        <Add /> New Lesson
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div className={classes.form}>
          <DialogTitle id='form-dialog-title'>Add New Lesson</DialogTitle>
          <DialogContent>
            <TextField
              label='Title'
              type='text'
              fullWidth
              value={values.title}
              onChange={handleChange("title")}
            />
            <br />
            <TextField
              label='Content'
              type='text'
              multiline
              fullWidth
              value={values.content}
              onChange={handleChange("content")}
            />
            <br />
            <TextField
              label='Resource link'
              type='text'
              fullWidth
              value={values.resource_url}
              onChange={handleChange("resource_url")}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary' variant='contained'>
              Cancel
            </Button>
            <Button onClick={clickSubmit} color='secondary' variant='contained'>
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default NewLesson;
