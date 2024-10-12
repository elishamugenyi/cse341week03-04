const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Electronics Collection API',
      version: '1.0.0',
      description: 'API documentation for the Item collection',
      contact: {
        name: 'Your Name',
      },
    },
    servers: [
      /*{
        url: 'https://app-data-update.netlify.app/', //site url is not working well. still building it
        description: 'Production Server',
      },*/
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
        schemas: {
          ItemData: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'The unique ID of the item',
              },
              name: {
                type: 'string',
                description: 'Name of the item',
              },
              price: {
                type: 'number',
                description: 'Price of the item',
              },
              category: {
                type: 'string',
                description: 'Category the item belongs to',
              },
              description: {
                type: 'string',
                description: 'Detailed description of the item',
              },
              quantity: {
                type: 'number',
                description: 'Quantity in stock',
              },
              inStock: {
                type: 'boolean',
                description: 'Whether the item is in stock',
              },
            },
            required: ['name', 'price', 'category', 'quantity', 'inStock'],
        },
      },
    },
  },
  apis: ['./routes/*.js' /*,'./models/*.js'*/], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };