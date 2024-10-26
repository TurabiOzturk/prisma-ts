import express from "express";
import categoryRoutes from "./routes/category";
import commentRoutes from "./routes/comment";
import postRoutes from "./routes/post";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
