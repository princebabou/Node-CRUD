const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Employee: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            age: {
              type: "number",
            },
            phone: {
              type: "string",
            },
            roleId: {
              type: "string",
            },
          },
          required: ["name", "email", "age", "phone"],
        },

        signup: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            email: {
              type: "string",
            },
            roleId: {
              type: "string",
            },
          },
          required: ["username", "password", "email", "roleId"],
        },
      },
      securitySchemes: {
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ],
    },
  },
  apis: ["./controllers/employeeController.js"],
};
module.exports = options;
