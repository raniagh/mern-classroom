import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewCourse from "./course/NewCourse";
import MyCourses from "./course/MyCourses";
import Course from "./course/Course";
import EditCourse from "./course/EditCourse";
import Enrollment from "./enrollment/Enrollment";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user/:userId' element={<Profile />} />

        <Route
          path='/user/edit/:userId'
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path='/teach/courses'
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />
        <Route
          path='/teach/course/:courseId'
          element={
            <PrivateRoute>
              <Course />
            </PrivateRoute>
          }
        />
        <Route
          path='/teach/course/new'
          element={
            <PrivateRoute>
              <NewCourse />
            </PrivateRoute>
          }
        />
        <Route
          path='/teach/course/edit/:courseId'
          element={
            <PrivateRoute>
              <EditCourse />
            </PrivateRoute>
          }
        />
        <Route
          path='/learn/:enrollmentId'
          element={
            <PrivateRoute>
              <Enrollment />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
