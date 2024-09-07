import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./db/db.js";
import transactions from "./routes/transactions.js";
import user from "./routes/users.js";
import goals from "./routes/Goals.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware (optional, depending on your application)
app.use(express.json());
app.use(cors())
// Define routes here
app.use("/api/v1/transactions",transactions);
app.use("/api/v1/auth", user );
app.use("/api/v1/goal",goals)
// Start the server
app.listen(PORT, () => {
    db()
  console.log(`Server listening on port ${PORT}`);
});
