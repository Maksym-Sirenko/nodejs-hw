// src/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import noteRouter from "./routes/notesRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  express.json({
    limit: "100kb",
    type: ["application/json", "application/vnd.api+json"],
  })
);
app.use(cors());
app.use(logger);

app.use(noteRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
