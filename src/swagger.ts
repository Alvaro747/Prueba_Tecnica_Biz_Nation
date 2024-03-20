import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

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
  apis: [path.join(__dirname, "./routes/*")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
