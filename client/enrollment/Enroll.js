import { Button } from "@material-ui/core";
import React from "react";
import { create } from "./api-enrollment";
import { useNavigate } from "react-router";
import auth from "../auth/auth-helper";

const Enroll = ({ courseId }) => {
  const jwt = auth?.isAuthenticated();
  const token = jwt.token;
  const navigate = useNavigate();

  const clickEnroll = async () => {
    const data = await create(courseId, token);
    if (data && data.error) {
      console.log(data.error);
    } else {
      navigate("/learn/" + data?._id);
    }
  };

  return (
    <Button variant='contained' color='secondary' onClick={clickEnroll}>
      Enroll
    </Button>
  );
};

export default Enroll;
