import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { read } from "./api-course";
import auth from "../auth/auth-helper";
import NewLesson from "./NewLesson";

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
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  media: {
    height: 190,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "0.9em",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "0.2em",
    marginTop: 5,
  },
  action: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  statSpan: {
    margin: "7px 10px 0 10px",
    alignItems: "center",
    color: "#616161",
    display: "inline-flex",
    "& svg": {
      marginRight: 10,
      color: "#b6ab9a",
    },
  },
  enroll: {
    float: "right",
  },
}));

const Course = () => {
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  const params = useParams();
  const courseId = params.courseId;
  const user = auth?.isAuthenticated().user;

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await read(courseId);
      if (data.error) {
        setError(data.error);
      } else {
        setCourse(data);
      }
    };
    fetchCourse();
  }, [courseId]);

  const addLesson = (course) => {
    setCourse(course);
  };

  const imageUrl = course?._id
    ? `/api/courses/photo/${course?._id}?${new Date().getTime()}`
    : "/api/courses/defaultphoto";

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={course?.name}
          subheader={
            <div>
              <Link
                to={"/user/" + course?.instructor._id}
                className={classes.sub}
              >
                By {course?.instructor.name}
              </Link>
              <span className={classes.category}>{course?.category}</span>
            </div>
          }
          action={
            <>
              {user && user._id == course?.instructor?._id && (
                <span className={classes.action}>
                  <Link to={"/teach/course/edit/" + course?._id}>
                    <IconButton aria-label='Edit' color='secondary'>
                      <Edit />
                    </IconButton>
                  </Link>
                </span>
              )}
            </>
          }
        />
        <div className={classes.flex}>
          <CardMedia
            image={imageUrl}
            title={course?.name}
            className={classes.media}
          />
          <div className={classes.details}>
            <Typography variant='body1' className={classes.subheading}>
              {course?.description}
            </Typography>
          </div>
        </div>
        <Divider />
        <div>
          <CardHeader
            title={
              <Typography variant='h6' className={classes.subheading}>
                Lessons
              </Typography>
            }
            subheader={
              <Typography variant='body1' className={classes.subheading}>
                {course?.lessons && course?.lessons.length} lessons
              </Typography>
            }
            action={
              user &&
              user?._id == course?.instructor?._id &&
              !course?.published && (
                <span className={classes.action}>
                  <NewLesson courseId={course?._id} addLesson={addLesson} />
                </span>
              )
            }
          />
          <List>
            {course?.lessons &&
              course?.lessons.map((lesson, index) => {
                return (
                  <span key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar> {index + 1} </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={lesson.title} />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                  </span>
                );
              })}
          </List>
        </div>
      </Card>
    </div>
  );
};

export default Course;
