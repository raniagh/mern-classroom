import React, { useEffect, useState } from "react";
import { read, update } from "./api-course";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  card: {
    padding: "24px 40px 40px",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  details: {
    margin: "16px",
  },
  upArrow: {
    border: "2px solid #f57c00",
    marginLeft: 3,
    marginTop: 10,
    padding: 4,
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  media: {
    height: 250,
    display: "inline-block",
    width: "50%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  textfield: {
    width: 350,
  },
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
  list: {
    backgroundColor: "#f3f3f3",
  },
}));

const EditCourse = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const jwt = auth?.isAuthenticated();
  const token = jwt.token;
  const user = jwt.user;

  const params = useParams();
  const courseId = params.courseId;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setCourse({ ...course, [name]: value });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await read(courseId);
      if (data.error) {
        setError(data.error);
      } else {
        data.image = "";
        setCourse(data);
      }
    };
    fetchCourse();
  }, [courseId]);

  const updateCourse = async () => {
    let courseData = new FormData();
    course.name && courseData.append("name", course.name);
    course.description && courseData.append("description", course.description);
    course.image && courseData.append("image", course.image);
    course.category && courseData.append("category", course.category);
    courseData.append("lessons", JSON.stringify(course.lessons));

    const data = await update(courseId, courseData, token);
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      navigate("/teach/course/" + course?._id);
    }
  };

  const handleLessonChange = (name, index) => (event) => {
    const lessons = course.lessons;
    lessons[index][name] = event.target.value;
    setCourse({ ...course, lessons: lessons });
  };

  const deleteLesson = (index) => (event) => {
    const lessons = course.lessons;
    lessons.splice(index, 1);
    setCourse({ ...course, lessons: lessons });
  };

  const moveUp = (index) => (event) => {
    const lessons = course.lessons;
    const moveUp = lessons[index];
    lessons[index] = lessons[index - 1];
    lessons[index - 1] = moveUp;
    setCourse({ ...course, lessons: lessons });
  };

  const imageUrl = course?._id
    ? `/api/courses/photo/${course?._id}?${new Date().getTime()}`
    : "/api/courses/defaultphoto";

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={
            <TextField
              type='text'
              fullWidth
              value={course?.name}
              onChange={handleChange("name")}
            />
          }
          subheader={
            <div>
              <Link
                to={"/user/" + course?.instructor._id}
                className={classes.sub}
              >
                By {course?.instructor.name}
              </Link>

              <TextField
                margin='dense'
                type='text'
                fullWidth
                value={course?.category}
                onChange={handleChange("category")}
              />
            </div>
          }
          action={
            user &&
            user._id == course?.instructor._id && (
              <span className={classes.action}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={updateCourse}
                >
                  Save
                </Button>
              </span>
            )
          }
        />

        <div className={classes.flex}>
          <CardMedia
            image={imageUrl}
            className={classes.media}
            title={course?.name}
          />
          <div className={classes.details}>
            <TextField
              margin='dense'
              multiline
              type='text'
              className={classes.textfield}
              value={course?.description}
              onChange={handleChange("description")}
            />
            <br />
            <br />
            <input
              accept='image/*'
              onChange={handleChange("image")}
              className={classes.input}
              id='icon-button-file'
              type='file'
            />
            <label htmlFor='icon-button-file'>
              <Button variant='outlined' color='secondary' component='span'>
                Change Photo
                <FileUpload />
              </Button>
            </label>
            <span className={classes.filename}>
              {course?.image ? course?.image.name : ""}
            </span>
            <br />
          </div>
        </div>

        <Divider />
      </Card>
    </div>
  );
};

export default EditCourse;
