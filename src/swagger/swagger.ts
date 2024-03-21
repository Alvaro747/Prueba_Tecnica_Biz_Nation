import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

function exploreDirectory(directory: string, files: string[] = []) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      exploreDirectory(itemPath, files);
    } else if (path.extname(item) === ".js" || path.extname(item) === ".ts") {
      files.push(itemPath);
    }
  });

  return files;
}

const routesDir = path.join(__dirname, "../routes");
const routeFiles = exploreDirectory(routesDir);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: routeFiles,
  components: {
    schemas: {},
  },
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
