import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/api", authRoutes);
server.use("/api", taskRoutes);

export default server;
