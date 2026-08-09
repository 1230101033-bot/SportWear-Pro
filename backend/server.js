import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;