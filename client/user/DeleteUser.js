import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";

const DeleteUser = ({ userId, token }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = async () => {
    const data = await remove(userId, token);
    if (data && data.error) {
      console.log(data.error);
    } else {
      auth.clearJWT(() => console.log("deleted"));
      navigate("/");
    }
  };

  return (
    <span>
      <IconButton aria-label='Delete' onClick={clickButton} color='secondary'>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
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

export default DeleteUser;
