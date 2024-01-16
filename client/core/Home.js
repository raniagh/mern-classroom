import React from "react";
import { Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import unicornbikeImg from "./../assets/images/unicornbike.jpg";
import { Link } from "react-router-dom";

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
  return (
    <Card className={classes.card}>
      <Typography variant='h6' className={classes.title}>
        Home Page
      </Typography>
      <Link to='/users'>Users</Link>
      <CardMedia
        className={classes.media}
        image={unicornbikeImg}
        title='Unicorn Bicycle'
      />
      <CardContent>
        <Typography variant='body2' component='p'>
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
