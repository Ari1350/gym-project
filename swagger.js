const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym Management API',
    description: 'Final Project - Part 1. Contains Classes and Memberships collections with full CRUD capabilities.'
  },
  // Tu URL local para pruebas. Al desplegar a Render cambiaremos esto o usaremos variables.
  host: 'gym-project-948y.onrender.com', 
  schemes: ['https'],
  definitions: {
    Class: {
      name: "Zumba Fitness",
      trainer: "John Doe",
      schedule: "Tuesday and Thursday 07:00 PM",
      capacity: 20,
      status: "active"
    },
    Membership: {
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      planType: "Monthly",
      status: "active"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Apunta al enrutador principal

swaggerAutogen(outputFile, endpointsFiles, doc);
