const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'The Socratic Method API',
        description: 'CSE 341 Final Project — Team Sneaky Can',
        contact: {
            name: "Ben Cornia, Eugene C. Olsen, Daniel De Melo",
            url: "https://github.com/DizzyMelo/cse341-final-project"
        }
    },
    host: '',
    basePath: '/',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
        "name": "The Socratic Method API",
        "description": "Questions, Answers, and Comments à la StackOverflow"
    }],
    securityDefinitions: {
        Authorization: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Authentication token (Bearer)",
          example: "Bearer <token>",
        },
      },
      security: [
        {
          Authorization: [],
        },
      ],
    };

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/app.ts'];

// Generate output file
swaggerAutogen(outputFile, endpointsFiles, doc);
