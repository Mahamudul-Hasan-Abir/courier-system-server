// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import app from "./app";

// const dbUrl = process.env.DB_URL;
// const port = process.env.PORT;

// main().catch((err) => console.log(err));

// async function main() {
//   try {
//     if (!dbUrl) {
//       throw new Error("Database URL not defined in environment variables");
//     }

//     await mongoose.connect(dbUrl as string);
//     console.log("Database Connected");
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// Before Socket

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";
import http from "http";
import { initSocket } from "./app/socket/socket";

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 5000;

main().catch((err) => console.log(err));

async function main() {
  try {
    if (!dbUrl) {
      throw new Error("Database URL not defined in environment variables");
    }

    await mongoose.connect(dbUrl as string);
    console.log("✅ Database Connected");

    // Create HTTP server and wrap Express app
    const server = http.createServer(app);

    // Initialize Socket.IO
    initSocket(server);

    server.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Server startup error:", error);
  }
}
