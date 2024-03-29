import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import enrollmentRoutes from "./routes/enrollment.routes";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    //here the Colors module is used
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
connectDB();

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", courseRoutes);
app.use("/", enrollmentRoutes);

app.get("/*", (req, res) => {
  res.status(200).send(Template());
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
