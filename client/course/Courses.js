import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import Enroll from "../enrollment/Enroll";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  gridList: {
    width: "100%",
    minHeight: 200,
    padding: "16px 0 0px",
  },
  tile: {
    textAlign: "center",
    border: "1px solid #cecece",
    backgroundColor: "#04040c",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    textAlign: "left",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#fffde7",
    display: "block",
  },
  action: {
    margin: "0 10px",
  },
}));

const Courses = ({ courses }) => {
  const classes = useStyles();

  return (
    <ImageList cols={2} className={classes.gridList}>
      {courses?.map((course, i) => {
        return (
          <ImageListItem
            className={classes.tile}
            key={i}
            style={{ padding: 0 }}
          >
            <Link to={"/teach/course/" + course._id}>
              <img
                src={"/api/courses/photo/" + course._id}
                alt={course.name}
                className={classes.image}
              />
            </Link>
            <ImageListItemBar
              className={classes.tileBar}
              title={
                <Link
                  to={"/teach/course/" + course._id}
                  className={classes.tileTitle}
                >
                  {course.name}
                </Link>
              }
              subtitle={<span>{course.category}</span>}
              actionIcon={
                <div className={classes.action}>
                  {auth.isAuthenticated() ? (
                    <Enroll courseId={course._id} />
                  ) : (
                    <Link to='/signin'>Sign in to Enroll</Link>
                  )}
                </div>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default Courses;
