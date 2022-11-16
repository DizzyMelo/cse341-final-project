const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'The Socratic Method API',
        description: 'CSE 341 Final Project',
        contact: {
            name: "Ben Cornia, Eugene C. Olsen, Daniel De Melo"
        }
    },
    host: '',
    basePath: '/',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
        "name": "The Socratic Method API",
        "description": "CSE 341, Final Project"
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

const outputFile = './swagger.json';
const endpointsFiles = ['./dist/app.js'];

// Generate output file
swaggerAutogen(outputFile, endpointsFiles, doc);
