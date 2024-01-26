import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import unicornbikeImg from "./../assets/images/unicornbike.jpg";
import { Link } from "react-router-dom";
import { listPublished } from "../course/api-course";
import Courses from "../course/Courses";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchListPublished = async (signal) => {
      const data = await listPublished(signal);

      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    };
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchListPublished(signal);
  }, []);

  return <Courses courses={courses} />;
};

export default Home;
