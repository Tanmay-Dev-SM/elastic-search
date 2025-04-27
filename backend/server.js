import express from "express";
import cors from "cors";
import seedRoutes from "./routes/seedRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/seed", seedRoutes);
app.use("/api/search", searchRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
