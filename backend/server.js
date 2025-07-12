import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at http://localhost:" + PORT);
    })
});