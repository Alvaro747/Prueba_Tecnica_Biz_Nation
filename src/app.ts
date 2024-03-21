import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import ExpressServer from "./server/expres-server";
import routes from "./routes";
import swaggerSpec from "./swagger";
import Database from "./config/Database";

// get host and port from enviroments variables
const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.POR) || 3000;

async function main() {
  // create express server.
  const server = new ExpressServer(HOST, PORT);

  // search for the environment file according to the environment in which the application is running
  const pathEnvirontment = process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : ".env";

  // Loading environment variables
  dotenv.config({
    path: pathEnvirontment,
  });

  // CORS configuration
  server.getExpress().use(cors());

  // pody-parser configuration
  server.getExpress().use(bodyParser.json());

  // implement swagger documentation
/*   server
    .getExpress()
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); */

  // implement routes
  server.getExpress().use("/api", routes);

  try {
    // create database connection
    Database.getInstance();

    // message to confirm the connection in express server
    await server.listen();

    // message to confirm the url of the documentation
    console.log(`Documentation: http://${HOST}:${PORT}/api-docs`);
  } catch (error) {
    console.error(error);
  }
}

main();
