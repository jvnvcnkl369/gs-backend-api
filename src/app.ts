import express from "express";
import { AppDataSource } from "./data-source.js";
import router from "./routes.js";
import bodyParserErrorHandler from "express-body-parser-error-handler";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    console.log("Running migrations...");
    await AppDataSource.runMigrations();
    console.log("Migrations completed.");

    const app = express();

    app.use(express.json());
    app.use(bodyParserErrorHandler());
    app.use("/api", router);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during starting server", error);
  }
};

startServer();
