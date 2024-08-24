import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./db/db.js";
import transactions from "./routes/transactions.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware (optional, depending on your application)
app.use(express.json());
app.use(cors())
// Define routes here
app.use("/api/v1/transactions",transactions);

// Start the server
app.listen(PORT, () => {
    db()
  console.log(`Server listening on port ${PORT}`);
});
