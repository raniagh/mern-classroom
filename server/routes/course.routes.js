import express from "express";
import authCtrl from "../controllers/auth.controller";
import courseCtrl from "../controllers/course.controller";
import userController from "../controllers/user.controller";

const router = express.Router();

router
  .route("/api/courses/by/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    courseCtrl.listByInstructor
  )
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userController.isEducator,
    courseCtrl.create
  );
router.param("userId", userController.userByID);
router
  .route("/api/courses/photo/:courseId")
  .get(courseCtrl.photo, courseCtrl.defaultPhoto);

router.route("/api/courses/defaultphoto").get(courseCtrl.defaultPhoto);

router.route("/api/courses/:courseId").get(courseCtrl.read);
router.param("courseId", courseCtrl.courseByID);

export default router;
