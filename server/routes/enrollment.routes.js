import express from "express";
import authController from "../controllers/auth.controller";
import courseController from "../controllers/course.controller";
import enrollmentController from "../controllers/enrollment.controller";

const router = express.Router();

router
  .route("/api/enrollment/new/:courseId")
  .post(
    authController.requireSignin,
    enrollmentController.findEnrollment,
    enrollmentController.create
  );

router.param("courseId", courseController.courseByID);

router
  .route("/api/enrollment/:enrollmentId")
  .get(
    authController.requireSignin,
    enrollmentController.isStudent,
    enrollmentController.read
  );

router
  .route("/api/enrollment/complete/:enrollmentId")
  .put(
    authController.requireSignin,
    enrollmentController.isStudent,
    enrollmentController.complete
  );

router.param("enrollmentId", enrollmentController.enrollmentByID);

router
  .route("/api/enrollment/enrolled")
  .get(authController.requireSignin, enrollmentController.listEnrolled);

router
  .route("/api/enrollment/stats/:courseId")
  .get(enrollmentController.enrollmentStats);

export default router;
