import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { create } from "./api-course";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const NewCourse = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    error: "",
  });
  const jwt = auth.isAuthenticated();
  const userId = jwt?.user?._id;
  const token = jwt?.token;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = async () => {
    let courseData = new FormData();
    values.name && courseData.append("name", values.name);
    values.description && courseData.append("description", values.description);
    values.image && courseData.append("image", values.image);
    values.category && courseData.append("category", values.category);
    const data = await create(userId, token, courseData);
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      navigate("/teach/courses");
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6' className={classes.title}>
            New Course
          </Typography>
          <br />
          <input
            accept='image/*'
            type='file'
            onChange={handleChange("image")}
            style={{ display: "none" }}
            className={classes.input}
            id='icon-button-file'
          />
          <label htmlFor='icon-button-file'>
            <Button variant='contained' color='secondary' component='span'>
              Upload Photo
              <FileUpload />
            </Button>
          </label>
          <span className={classes.filename}>
            {values.image ? values.image.name : ""}
          </span>
          <br />
          <TextField
            id='name'
            label='Name'
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin='normal'
          />
          <br />
          <TextField
            id='description'
            label='Description'
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            margin='normal'
          />
          <br />
          <TextField
            id='category'
            label='Category'
            className={classes.textField}
            value={values.category}
            onChange={handleChange("category")}
          />
          <br />
          {values.error && (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          <Link to='/teach/courses' className={classes.submit}>
            <Button variant='contained'>Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewCourse;
