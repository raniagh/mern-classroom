import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import Enroll from "./Enroll";

const Courses = ({ courses }) => {
  return (
    <GridList cellHeight={220} cols={2}>
      {courses.map((course, i) => {
        return (
          <GridListTile key={i} style={{ padding: 0 }}>
            <Link to={"/course/" + course._id}>
              <img src={"/api/courses/photo/" + course._id} alt={course.name} />
            </Link>
            <GridListTileBar
              title={<Link to={"/course/" + course._id}>{course.name}</Link>}
              subtitle={<span>{course.category}</span>}
              actionIcon={
                auth.isAuthenticated() ? (
                  <Enroll courseId={course._id} />
                ) : (
                  <Link to='/signin'>Sign in to Enroll</Link>
                )
              }
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default Courses;
