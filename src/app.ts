import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
const app = express();
const allowedOrigins = ["http://localhost:3000"];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Courier System Server");
});

app.use("/api/v1", router);
export default app;
