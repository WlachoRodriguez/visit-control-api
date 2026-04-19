import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/user/user.route.js";
import districtRoutes from "./modules/district/district.router.js";
import churchRoutes from "./modules/church/church.router.js";
import memberRoutes from "./modules/member/member.router.js";
import visitRoutes from "./modules/visit/visit.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/district", districtRoutes);
app.use("/church", churchRoutes);
app.use("/member", memberRoutes);
app.use("/visit", visitRoutes);

app.use(errorHandler);

export default app;
