import express from 'express';
import { AppDataSource } from './data-source.js';

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
     
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error during Data Source initialization", error);
    }
  };
  
  startServer();
