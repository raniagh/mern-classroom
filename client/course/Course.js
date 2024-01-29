import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { read, update } from "./api-course";
import auth from "../auth/auth-helper";
import NewLesson from "./NewLesson";
import DeleteCourse from "./DeleteCourse";

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
  const navigate = useNavigate();
  const classes = useStyles();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const params = useParams();
  const courseId = params.courseId;
  const jwt = auth?.isAuthenticated();
  const user = jwt.user;
  const token = jwt.token;

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

  const removeCourse = (course) => {
    navigate("/teach/courses");
  };

  const clickPublish = () => {
    if (course?.lessons.length > 0) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const publish = () => {
    let courseData = new FormData();
    courseData.append("published", true);
    const data = update(courseId, courseData, token);
    if (data && data.error) {
      setError(data.error);
    } else {
      setCourse({ ...course, published: true });
      setOpen(false);
    }
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
                  {!course?.published ? (
                    <>
                      <Button
                        color='secondary'
                        variant='outlined'
                        onClick={clickPublish}
                      >
                        {course.lessons.length == 0
                          ? "Add atleast 1 lesson to publish"
                          : "Publish"}
                      </Button>
                      <DeleteCourse course={course} onRemove={removeCourse} />
                    </>
                  ) : (
                    <Button color='primary' variant='outlined'>
                      Published
                    </Button>
                  )}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Publish Course</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>
            Publishing your course will make it live to students for enrollment.
          </Typography>
          <Typography variant='body1'>
            Make sure all lessons are added and ready for publishing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='contained'>
            Cancel
          </Button>
          <Button onClick={publish} color='secondary' variant='contained'>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Course;
