import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import Enroll from "./Enroll";

const Courses = ({ courses }) => {
  return (
    <ImageList cols={2}>
      {courses.map((course, i) => {
        return (
          <ImageListItem key={i} style={{ padding: 0 }}>
            <Link to={"/teach/course/" + course._id}>
              <img src={"/api/courses/photo/" + course._id} alt={course.name} />
            </Link>
            <ImageListItemBar
              title={
                <Link to={"/teach/course/" + course._id}>{course.name}</Link>
              }
              subtitle={<span>{course.category}</span>}
              actionIcon={
                auth.isAuthenticated() ? (
                  <Enroll courseId={course._id} />
                ) : (
                  <Link to='/signin'>Sign in to Enroll</Link>
                )
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default Courses;
