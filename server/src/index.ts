import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
console.log("ENV:", process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});